/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const { randomResponse, intentHandlers } = require('ask-utils')
const { getRandomMessage } = randomResponse
const { canHandle } = intentHandlers


const SKILL_NAME = '地震避難チェックリスト'
const preMessages = [
  '地震避難チェックリストです。',
  '地震避難チェックリストを起動します。'
]
const questions = [
  '「避難前の確認」「事前準備リスト」のどれが知りたいですか？',
  '「避難前の確認」「事前準備リスト」のどれが知りたいですか？',
  '「避難前の確認」「事前準備リスト」、知りたい内容を教えてください。'
]
const exitMessages = [
  'ご安全に。'
]

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return false // canHandle(handlerInput, 'LaunchRequest')
  },
  handle(handlerInput) {
    const preText = randomResponse(preMessages);
    const speechText = randomResponse(questions);

    return handlerInput.responseBuilder
      .speak(`${preText}${speechText}`)
      .reprompt(speechText)
      .withSimpleCard(preText, speechText)
      .getResponse();
  },
};

const AskRefugeCheckListIntent = {
  canHandle(handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'AskRefugeCheckListIntent') || canHandle(handlerInput, 'LaunchRequest');
  },
  handle(handlerInput) {
    let speechText = '揺れが落ち着くまでは身の安全の確保に専念してください。'
    speechText += 'ガスは自動で止まるケースが多いですが、避難前には元栓を閉めるようにします。';
    speechText += '水が出る様子であれば、やかんや鍋・バケツ・浴槽などに水を貯めましょう。'
    speechText += '通電火災の恐れがありますので、電気が止まっている場合はブレーカーを必ず落としてください。'
    speechText += '外に出る場合は、屋根瓦やブロック塀が降ってくる可能性があるので十分に注意してください。'

    const repromptText = ''//'避難時に持って行く荷物について知りたい場合は、「持ち物リスト」と話しかけてください。'

    return handlerInput.responseBuilder
      .speak(`${speechText}${repromptText}`)
      // .reprompt(repromptText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

/*
List APIでデータにつっこむとかでもいいかも。
{
  "name": "AskRefugeItemIntent",
  "slots": [],
  "samples": [
    "持って行くべきものは何",
    "持って行くべきものは",
    "持って行くべきものが何か教えて",
    "持って行くべきものを教えて",
    "持って行くべきもの",
    "持って行くべきもの",
    "持ち物を教えて",
    "持ち物リスト",
    "持ちものリストを話して",
    "持ちものリストを教えて",
    "何を持っていけばいいですか",
    "何を持っていけばいい",
    "何持っていけばいいですか",
    "何持っていけばいい"
  ]
},
*/
const AskRefugeItemIntent = {
  canHandle(handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'AskRefugeItemIntent');
  },
  handle(handlerInput) {
    let speechText = '揺れが落ち着くまでは身の安全の確保に専念してください。'
    speechText += '過去の地震で最も被害を大きくしたのは、震災後の火災です。必ず、ガスの元栓を閉じ、ブレーカーを落としてください。';
    speechText += '水が出る様子であれば、やかんや鍋・バケツ・浴槽などに水を貯めましょう。空ペットボトルを利用するのも効果的です。'
    speechText += '外に出る場合は、屋根瓦やブロック塀が降ってくる可能性があるので十分に注意してください。'

    const repromptText = '避難時に持って行く荷物について知りたい場合は、「持ち物リスト」と話しかけてください。'

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const AskPrepareIntent = {
  canHandle(handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'AskPrepareIntent');
  },
  handle(handlerInput) {
    const messages = [
      '非常持ち出し袋の目安重量は男性15キログラム、女性10キログラムです。現金や権利書・保険証などのお金に関わるもの。かんぱんや缶詰・水などの飲食物。上着・下着・タオルなどの衣類。ラジオや懐中電灯・常備薬などを用意しましょう。',
      '個人備蓄では、一人１日３リットル程度の飲料水があることをオススメします。また、卓上コンロやガスボンベなどでお湯を沸かせる状態にしておきましょう。非常食の他に、毛布や洗面用具なども必需品となりますので、忘れないようにしましょう。'、
      '懐中電灯・水・携帯ラジオ・食料・乾電池・卓上コンロ・タオル・現金・ポリタンク・救急セットの１０点があると、災害時に役立ちます。',
      '詳しくは、「人と防災未来センター」の公開している減災グッズチェックリストを御覧ください。',
    ]

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'このスキルでは、地震発生後にやるべきことや持って行くべきものを紹介します。避難用品などの情報は、西宮市のwebサイトの情報を元にしています。';
    const repromptText = randomResponse(questions);

    return handlerInput.responseBuilder
      .speak(`${preText}${speechText}`)
      .reprompt(repromptText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = randomResponse(exitMessages)

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('すみません。上手く聞き取れませんでした。もう一度お願いします。')
      .reprompt('もう一度知りたい内容について教えてください。')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AskRefugeCheckListIntent,
    AskRefugeItemIntent,
    AskPrepareIntent,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
