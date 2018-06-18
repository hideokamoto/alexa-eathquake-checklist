# Alexa地震避難チェックリストスキル

地震で揺れている最中や避難する前にやるべきことをAlexaに聞くためのスキルです。

## インストール

```
$ git clone git@github.com:hideokamoto/alexa-eathquake-checklist.git
$ cd alexa-eathquake-checklist/lambda/custom
$ npm install
$ cd ../../
```

## Skillのデプロイ

`ask-cli`を使うことで、個人のAlexaアカウントにデプロイができます。

```
$ npm i -g ask-cli
$ ask init
$ ask deploy
```

## Lambda
`./lambda/custom`にLambdaのソースコードが用意されてます。

### Lint

```
$ cd lambda/custom
$ npm run lint
```

## データソース
西宮市の情報などを参考にしています。
https://www.nishi.or.jp/kurashi/anshin/bosaijoho/kateinotaisaku/sonae-hinan/saigai-mamoru.html
https://www.nishi.or.jp/kurashi/anshin/bosaijoho/kateinotaisaku/sonae-hinan/higoro.html
