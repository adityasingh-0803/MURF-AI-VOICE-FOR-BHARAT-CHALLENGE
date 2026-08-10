# Day 5 – The Tools

## Track

Learning & Literacy

## Tool

`get_next_exercise`

## Purpose

The tool fetches a practice exercise based on:

- learner level
- requested topic

## Example

User:

> Mujhe Algebra ka ek question do.

Agent calls:

```text
get_next_exercise(
    level="Intermediate",
    topic="Algebra"
)
