# About this document

Here should be placed all workarounds of the development process. If something doesn't work as expected and an appropriate solution was not found, then the case should be mentioned in this file. Each case should have a unique name in the [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) format. Parts of the code that are related to a specific case should be marked with a comment that should contain the name of the case. All descriptions should be put in this file, avoiding verbosity in the code.

# Workarounds

## DECORATORS_USAGE_IN_SPEC_FILES_ERROR

When `spec.ts` files are excluded in `tsconfig.json` file, to avoid them in the build result, editor (vscode) raises TS1240 error on decorator applying statements for any decorator in `spec.ts` files (including decorators that were created directly in spec files). The error by itself doesn't affect compiling or testing processes, but only makes error marks.

Failed workaround: if `@ts-expect-error` is used on decorators then the editor stops showing TS1240 error, but `ts-jest` starts trowing TS2578 `Unused @ts-expect-error` when tries to compile.

Workaround: ignored `spec.js`, `spec.js.map` and `spec.d.ts` files in `.npmignore` file, for build results.

## TSBUILDINFO_NOT_IGNORED_BY_NPM

Unexpected behavior: file `tsconfig.tsbuildinfo` is already listed in `.gitignore` but not ignored by `npm pack`.
