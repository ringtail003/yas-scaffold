ブログエントリのサンプルコードとしてのリポジトリです。

# Usage

## Setup Environment

```sh
node --version
> v22.9.0

mkdir my-project
cd my-project
```

```sh
npx ringtail003/yas-scaffold yas --init
```

```sh
> 設定ファイルをコピーしました（package.json）
> 設定ファイルをコピーしました（eslint.config.json）
> ...
```

```js
// package.json
"name": "my-project"
```

```sh
npm install
```

## Testing

```sh
npm test
```

```sh
> ✔ src/greet.ts (72.979375ms)
>   ✔ プリミティブ (0.4155ms)
>   ✔ 配列 (0.474125ms)
> ...
> ℹ tests 13
> ℹ pass 13
```

## Lint

```sh
npm run lint
```

```sh
> /yas-scaffold/src/index.ts
> error Yahoo!広告スクリプトで'〜'は使えません。 custom/no-wave-dash
> 
> ✖ 1 problem (1 error, 0 warnings)
```

## Build

```sh
npm run publish
```

```
> created dist/bundle.js in 343ms
> created dist/publish.js
```

## Update environment

```sh
npx ringtail003/yas-scaffold yas --update
```
