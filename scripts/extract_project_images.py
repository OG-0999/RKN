from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import fitz


SOURCE_ROOT = Path(r"E:\RIGHTKEYNAVIGATORSWEBSITE")
WEB_ROOT = Path(r"E:\RIGHTKEYNAVIGATORSWEBSITE\rightkey-navigators-site\rightkey-navigators")
OUTPUT_ROOT = WEB_ROOT / "public" / "assets" / "projects"
MANIFEST_TS = WEB_ROOT / "src" / "lib" / "projectImages.ts"


@dataclass(frozen=True)
class ProjectConfig:
    name: str
    slug: str
    pdfs: list[str]


PROJECTS = [
    ProjectConfig(
        name="Birla Evara",
        slug="birla-evara",
        pdfs=["Birla Evara Customer Presentation_Feb 2026.pdf"],
    ),
    ProjectConfig(
        name="Nambiar District 25",
        slug="nambiar-district-25",
        pdfs=["Nambiar District 25 Phase 2 mini brochure final.pdf"],
    ),
    ProjectConfig(
        name="SSVR Meridian",
        slug="ssvr-meridian",
        pdfs=["SSVR_MERIDIAN_BROCHURE.pdf"],
    ),
    ProjectConfig(
        name="The Sports Province",
        slug="the-sports-province",
        pdfs=["The Sports Province_A4_Brochure_V7_Jul25.pdf"],
    ),
    ProjectConfig(
        name="MEDA East Winds",
        slug="meda-east-winds",
        pdfs=["Meda_Sales_Presenter_Aug25.pdf", "Meda Floor Plan.pdf"],
    ),
    ProjectConfig(
        name="East Park Residences (Ramsons Trendsquares)",
        slug="east-park-residences-ramsons-trendsquares",
        pdfs=["Ramsons Brochure New launch.pdf"],
    ),
    ProjectConfig(
        name="TRL (The Right Life)",
        slug="trl-the-right-life",
        pdfs=["TRL_Main Brochure_V26.pdf", "TRL_10 & 11 Marketing collaterals_mar_2026 1.pdf"],
    ),
    ProjectConfig(
        name="Godrej Lakeside Orchards",
        slug="godrej-lakeside-orchards",
        pdfs=[],
    ),
]


FLOOR_PLAN_KEYWORDS = (
    "floor plan",
    "unit plan",
    "series",
    "sba",
    "rera carpet",
    "tower",
    "master plan",
    "typical floor",
)

AMENITY_KEYWORDS = (
    "amenities",
    "amenity",
    "clubhouse",
    "swimming",
    "sports",
    "gym",
    "play area",
    "jogging",
    "yoga",
    "skating",
)

# Filters out tiny logos/icons and keeps visually meaningful imagery.
MIN_WIDTH = 700
MIN_HEIGHT = 450
MIN_AREA = 450_000


def clean_name(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def classify_image_type(page_text: str) -> str:
    lowered = page_text.lower()

    if any(keyword in lowered for keyword in FLOOR_PLAN_KEYWORDS):
        return "floor-plan"

    if any(keyword in lowered for keyword in AMENITY_KEYWORDS):
        return "amenities"

    return "gallery"


def write_manifest(manifest: dict[str, Any]) -> None:
    body = json.dumps(manifest, ensure_ascii=False, indent=2)
    ts_content = (
        "export type ProjectImageSet = {\n"
        "  heroImage?: string;\n"
        "  galleryImages: string[];\n"
        "  floorPlanImages: string[];\n"
        "  amenityImages: string[];\n"
        "};\n\n"
        "export const projectImagesByName: Record<string, ProjectImageSet> = "
        f"{body} as const;\n"
    )
    MANIFEST_TS.write_text(ts_content, encoding="utf-8")


def extract_for_project(project: ProjectConfig) -> dict[str, Any]:
    project_output_dir = OUTPUT_ROOT / project.slug
    gallery_output_dir = project_output_dir / "gallery"
    gallery_output_dir.mkdir(parents=True, exist_ok=True)

    for existing in gallery_output_dir.glob("*"):
        if existing.is_file():
            existing.unlink()

    extracted: list[dict[str, Any]] = []

    for pdf_name in project.pdfs:
        pdf_path = SOURCE_ROOT / pdf_name
        if not pdf_path.exists():
            continue

        doc = fitz.open(pdf_path)
        seen_xrefs: set[int] = set()

        for page_index in range(doc.page_count):
            page = doc.load_page(page_index)
            page_number = page_index + 1
            page_text = page.get_text("text")
            image_type = classify_image_type(page_text)

            for order, image_info in enumerate(page.get_images(full=True), start=1):
                xref = image_info[0]
                if xref in seen_xrefs:
                    continue

                base_image = doc.extract_image(xref)
                width = int(base_image.get("width", 0))
                height = int(base_image.get("height", 0))
                area = width * height

                if width < MIN_WIDTH or height < MIN_HEIGHT or area < MIN_AREA:
                    continue

                image_bytes = base_image.get("image")
                if not image_bytes:
                    continue

                seen_xrefs.add(xref)
                ext = str(base_image.get("ext", "png")).lower()
                pdf_stem_slug = clean_name(Path(pdf_name).stem)
                file_name = (
                    f"{pdf_stem_slug}_p{page_number:03d}_x{xref}_{order}_{image_type}.{ext}"
                )

                output_path = gallery_output_dir / file_name
                output_path.write_bytes(image_bytes)

                extracted.append(
                    {
                        "url": f"/assets/projects/{project.slug}/gallery/{file_name}",
                        "type": image_type,
                        "page": page_number,
                        "pdf": pdf_name,
                    }
                )

    extracted.sort(key=lambda item: (item["pdf"], item["page"], item["url"]))

    non_floor = [item for item in extracted if item["type"] != "floor-plan"]
    hero_image = (non_floor[0]["url"] if non_floor else (extracted[0]["url"] if extracted else None))

    gallery_images: list[str] = []
    floor_plan_images: list[str] = []
    amenity_images: list[str] = []

    for item in extracted:
        if item["url"] == hero_image:
            continue

        if item["type"] == "floor-plan":
            floor_plan_images.append(item["url"])
        elif item["type"] == "amenities":
            amenity_images.append(item["url"])
        else:
            gallery_images.append(item["url"])

    merged_gallery = gallery_images + amenity_images + floor_plan_images

    return {
        "heroImage": hero_image,
        "galleryImages": merged_gallery[:12],
        "floorPlanImages": floor_plan_images,
        "amenityImages": amenity_images,
    }


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    manifest: dict[str, Any] = {}

    for project in PROJECTS:
        manifest[project.name] = extract_for_project(project)

    write_manifest(manifest)

    print(f"Generated: {MANIFEST_TS}")
    for project in PROJECTS:
        data = manifest[project.name]
        hero = "yes" if data.get("heroImage") else "no"
        count = len(data.get("galleryImages", []))
        print(f"{project.name}: hero={hero}, gallery={count}")


if __name__ == "__main__":
    main()
