/**
 * Copyright 2016 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

'use strict'

const assert = require('assert')

const {
  Message
} = require('../../protobuf')

describe('ProtoBuf', () => {
  describe('Message', () => {
    it('should correctly round trip with complete fields', () => {
      let encMessage = Message.encode({
        messageType: 'test_message',
        correlationId: 'corr_id',
        content: Buffer.from('Hello', 'utf8'),
        sender: 'sender_id'
      }).finish()

      let decMessage = Message.decode(encMessage)

      assert.equal('test_message', decMessage.messageType)
      assert.equal('corr_id', decMessage.correlationId)
      assert.equal('Hello', decMessage.content.toString('utf8'))
      assert.equal('sender_id', decMessage.sender)
    })

    it('should correctly round trip with partial fields', () => {
      let encMessage = Message.encode({
        messageType: 'test_message',
        correlationId: 'corr_id',
        content: Buffer.from('Hello', 'utf8')
      }).finish()

      let decMessage = Message.decode(encMessage)

      assert.equal('test_message', decMessage.messageType)
      assert.equal('corr_id', decMessage.correlationId)
      assert.equal('Hello', decMessage.content.toString('utf8'))
      assert.ok(!decMessage.sender)
    })
  })
})
