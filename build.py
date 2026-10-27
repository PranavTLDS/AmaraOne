#!/usr/bin/env python3
"""Assemble src/pages/*.html into the site root, expanding <!-- @include name --> from src/partials/.

Usage: python3 build.py
"""
import re
from pathlib import Path

root = Path(__file__).parent
partials = {p.stem: p.read_text() for p in (root / "src/partials").glob("*.html")}

for page in sorted((root / "src/pages").glob("*.html")):
    html = page.read_text()
    meta = dict(re.findall(r"<!-- @(\w+): (.*?) -->\n", html))
    html = re.sub(r"<!-- @\w+: .*? -->\n", "", html)
    while "<!-- @include" in html:  # partials may include other partials
        html = re.sub(r"<!-- @include (\w+) -->", lambda m: partials[m.group(1)], html)
    for k, v in meta.items():
        html = html.replace("{{" + k + "}}", v)
    (root / page.name).write_text(html)
    print("built", page.name)
