const assert = require('power-assert')
const { execFile } = require('child_process')

const skillId = 'amzn1.ask.skill.348dd8fe-9e02-4802-9010-04c6c7916e0c'
const lang = 'ja-JP'
const invokcationName = '地震避難サポーターを開いて'

describe('test by ask-cli', () => {
  it('should return valid response when send invocation name', (done) => {
    execFile('ask', [
      'simulate', '-s', skillId,
      '-l', lang, '-t', invokcationName
    ], (error, stdout, stderr) => {
      if (error) {
        assert.deepEqual(error, {})
      } else {
        const { result } = JSON.parse(stdout)
        const { invocationResponse } = result.skillExecutionInfo
        const { response } = invocationResponse.body
        assert.notEqual(response.card.title.indexOf('地震避難サポーター'), -1)
        assert.notEqual(response.outputSpeech.ssml.indexOf('「避難前の確認」「事前準備リスト」'), -1)
        assert.notEqual(response.reprompt.outputSpeech.ssml.indexOf('「避難前の確認」「事前準備リスト」'), -1)
        assert.equal(response.shouldEndSession, false)
      }
      done()
    })
  })
  it('should return valid response when send onceshot intent', (done) => {
    execFile('ask', [
      'simulate', '-s', skillId,
      '-l', lang, '-t', `${invokcationName}事前準備リストを教えて`
    ], (error, stdout, stderr) => {
      if (error) {
        assert.deepEqual(error, {})
      } else {
        const { result } = JSON.parse(stdout)
        const { invocationResponse } = result.skillExecutionInfo
        const { response } = invocationResponse.body
        assert.notEqual(response.card.title.indexOf('地震避難サポーター'), -1)
        assert.notEqual(response.outputSpeech.ssml.indexOf('非常持ち出し袋の目安重量は男性15キログラム'), -1)
        assert.equal(response.outputSpeech.ssml.indexOf('「避難前の確認」「事前準備リスト」'), -1)
      }
      done()
    })
  })
  it('should return valid response when send invocation name and call AMAZON.HelpIntent', (done) => {
    execFile('ask', [
      'simulate', '-s', skillId,
      '-l', lang, '-t', invokcationName
    ], (error, stdout, stderr) => {
      if (error) {
        assert.deepEqual(error, {})
      } else {
        execFile('ask', [
          'simulate', '-s', skillId,
          '-l', lang, '-t', 'ヘルプ'
        ], (error, stdout, stderr) => {
          if (error) {
            assert.deepEqual(error, {})
          } else {
            const { result } = JSON.parse(stdout)
            const { invocationResponse } = result.skillExecutionInfo
            const { response } = invocationResponse.body
            assert.notEqual(response.card.title.indexOf('地震避難サポーター'), -1)
            assert.notEqual(response.outputSpeech.ssml.indexOf('このスキルでは、地震発生後にやるべきことや持って行くべきものを紹介します。'), -1)
            assert.notEqual(response.outputSpeech.ssml.indexOf('「避難前の確認」「事前準備リスト」'), -1)
            assert.notEqual(response.reprompt.outputSpeech.ssml.indexOf('「避難前の確認」「事前準備リスト」'), -1)
            assert.equal(response.shouldEndSession, false)
          }
          done()
        })
      }
    })
  })
})
