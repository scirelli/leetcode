from __future__ import annotations
from typing import Optional
from dataclasses import dataclass


@dataclass
class Node:
    left: Optional[Node]
    right: Optional[Node]
    value: int
