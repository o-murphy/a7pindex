# Ballistic profiles index (.a7p)

## Build & Deploy

```shell
git clone https://github.com/o-murphy/a7pIndex
cd a7pIndex
git submodule update --init
cpy './a7p/gallery/**' './public/gallery'
yarn install
yarn index:build
yarn deploy 
```