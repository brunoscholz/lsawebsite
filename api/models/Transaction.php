<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%transaction}}".
 *
 * @property string $transactionId
 * @property integer $type
 * @property string $senderId
 * @property string $senderPublicKey
 * @property string $recipientId
 * @property string $amount
 * @property string $fee
 * @property integer $timestamp
 *
 * @property Relationship[] $relationships
 */
class Transaction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%transaction}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['transactionId', 'type', 'senderPublicKey', 'amount', 'fee', 'timestamp'], 'required'],
            [['type', 'amount', 'fee', 'timestamp'], 'integer'],
            [['transactionId', 'senderId', 'recipientId'], 'string', 'max' => 21],
            [['senderPublicKey'], 'string', 'max' => 64],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'transactionId' => Yii::t('app', 'Transaction ID'),
            'type' => Yii::t('app', 'Type'),
            'senderId' => Yii::t('app', 'Sender ID'),
            'senderPublicKey' => Yii::t('app', 'Sender Public Key'),
            'recipientId' => Yii::t('app', 'Recipient ID'),
            'amount' => Yii::t('app', 'Amount'),
            'fee' => Yii::t('app', 'Fee'),
            'timestamp' => Yii::t('app', 'Timestamp'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationships()
    {
        return $this->hasMany(Relationship::className(), ['transactionId' => 'transactionId']);
    }
}
