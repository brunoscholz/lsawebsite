<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%video}}".
 *
 * @property string $videoId
 * @property string $movie
 * @property double $length
 * @property string $status
 *
 * @property Media[] $media
 */
class Video extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%video}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['videoId', 'movie', 'length'], 'required'],
            [['length'], 'number'],
            [['videoId'], 'string', 'max' => 21],
            [['movie'], 'string', 'max' => 255],
            [['status'], 'string', 'max' => 3],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'videoId' => Yii::t('app', 'Video ID'),
            'movie' => Yii::t('app', 'Movie'),
            'length' => Yii::t('app', 'Length'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['videoId' => 'videoId']);
    }
}
