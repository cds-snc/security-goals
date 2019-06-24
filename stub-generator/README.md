# Stub generator

The purpose of this tool is to create stubs for check files. Ensure that you have installed all the dependencies first: `yarn` or `npm install`.

To use it, run: `yarn stubs -o /tmp -l PBMM` or `npm run stubs -o /tmp -l PBMM`

You can use it with the following options:

```
Options:
  -o, --outpath <outpath>  The directory to put stub files into
  -l, --level <level>      The level of protection required: ULL, PALL, or PBMM. Default ULL
  -h, --help               output usage information
```
