# MyBlog Web

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
yarn prettier
```

## Release

### Release Only

X.Y.Z means {major}.{minor}.{patch}

```bash
# Upgrade major versions
yarn release major
# Upgrade minor version
yarn release minor
# Upgrade patch version
yarn release patch # or
yarn release

# Upgrade pre-release version
yarn release --preRelease alpha
yarn release --preRelease beta
yarn release --preRelease rc
```

### Release and Build

```bash
# Upgrade patch version and build
yarn release && yarn build
# Also
yarn rab
```
