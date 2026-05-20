"""Convert product hero JPGs to WebP for the landing."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT: Path = Path(__file__).resolve().parents[1]
SRC_DIR: Path = ROOT / "public" / "images" / "products"
QUALITY: int = 88
METHOD: int = 6


def convert(jpg_path: Path) -> Path:
    out_path: Path = jpg_path.with_suffix(".webp")
    with Image.open(jpg_path) as img:
        img.save(out_path, "WEBP", quality=QUALITY, method=METHOD)
    return out_path


def main() -> None:
    for jpg in sorted(SRC_DIR.glob("*.jpg")):
        webp: Path = convert(jpg)
        before: int = jpg.stat().st_size
        after: int = webp.stat().st_size
        ratio: int = 100 - (100 * after) // before
        print(
            f"{jpg.name:<18} {before:>8} B  ->  "
            f"{webp.name:<20} {after:>8} B  ({ratio}% smaller)"
        )


if __name__ == "__main__":
    main()
