<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%referencetransaction}}".
 *
 * @property string $referenceTransactionId
 * @property string $relationshipId
 * @property double $quantity
 * @property double $cost
 * @property double $discount
 * @property double $price
 *
 * @property Relationship $relationship
 * @property Relationship[] $relationships
 */
class ReferenceTransaction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%referencetransaction}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['referenceTransactionId', 'quantity', 'cost', 'discount', 'price'], 'required'],
            [['quantity', 'cost', 'discount', 'price'], 'number'],
            [['referenceTransactionId', 'relationshipId'], 'string', 'max' => 21],
            [['relationshipId'], 'exist', 'skipOnError' => true, 'targetClass' => Relationship::className(), 'targetAttribute' => ['relationshipId' => 'relationshipId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'referenceTransactionId' => Yii::t('app', 'Reference Transaction ID'),
            'relationshipId' => Yii::t('app', 'Relationship ID'),
            'quantity' => Yii::t('app', 'Quantity'),
            'cost' => Yii::t('app', 'Cost'),
            'discount' => Yii::t('app', 'Discount'),
            'price' => Yii::t('app', 'Price'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationship()
    {
        return $this->hasOne(Relationship::className(), ['relationshipId' => 'relationshipId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationships()
    {
        return $this->hasMany(Relationship::className(), ['referenceId' => 'referenceTransactionId']);
    }
}
