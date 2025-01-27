# About this document
Here should be placed all workarounds of the development process. If something doesn't work as expected and an appropriate solution was not found, then the case should mentioned in this file. Each case should have a unique name in the [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) format. Parts of the code that are related to a specific case should be marked with a comment that should contain the name of the case. All descriptions should be put in this file, avoiding verbosity in the code.


# Workarounds

## DECORATORS_USAGE_IN_SPEC_FILES_ERROR
When `spec.ts` files are excluded in `tsconfig.json` file, to avoid them in the build result, editor (vscode) raises TS1240 error on decorator applying statements for any decorator in `spec.ts` files (including decorators that were created directly in spec files). The error by itself doesn't affect compiling or testing processes, but only makes error marks.

Workaround: commented decorators with `@ts-expect-error TS(1240)` in `spec.ts` files, to avoid annoying error messages.