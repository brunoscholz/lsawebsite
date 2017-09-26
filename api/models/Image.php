<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%image}}".
 *
 * @property string $imageId
 * @property string $large
 * @property string $thumb
 * @property string $status
 *
 * @property Media[] $media
 */
class Image extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%image}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['imageId', 'large', 'thumb'], 'required'],
            [['imageId'], 'string', 'max' => 21],
            [['large', 'thumb'], 'string', 'max' => 255],
            [['status'], 'string', 'max' => 3],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'imageId' => Yii::t('app', 'Image ID'),
            'large' => Yii::t('app', 'Large'),
            'thumb' => Yii::t('app', 'Thumb'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['imageId' => 'imageId']);
    }
}
