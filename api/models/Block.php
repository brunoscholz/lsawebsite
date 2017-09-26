<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%block}}".
 *
 * @property string $blockId
 * @property string $previousHash
 * @property integer $timestamp
 * @property string $data
 * @property string $hash
 *
 * @property Block $previousHash0
 * @property Block[] $blocks
 */
class Block extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%block}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['blockId', 'previousHash', 'timestamp', 'data', 'hash'], 'required'],
            [['timestamp'], 'integer'],
            [['data'], 'string'],
            [['blockId'], 'string', 'max' => 21],
            [['previousHash'], 'string', 'max' => 64],
            [['hash'], 'string', 'max' => 4],
            [['previousHash'], 'exist', 'skipOnError' => true, 'targetClass' => Block::className(), 'targetAttribute' => ['previousHash' => 'hash']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'blockId' => Yii::t('app', 'Block ID'),
            'previousHash' => Yii::t('app', 'Previous Hash'),
            'timestamp' => Yii::t('app', 'Timestamp'),
            'data' => Yii::t('app', 'Data'),
            'hash' => Yii::t('app', 'Hash'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPreviousHash0()
    {
        return $this->hasOne(Block::className(), ['hash' => 'previousHash']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getBlocks()
    {
        return $this->hasMany(Block::className(), ['previousHash' => 'hash']);
    }
}
