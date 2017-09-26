<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%geography}}".
 *
 * @property string $geographyId
 * @property string $cityCode
 * @property string $cityName
 * @property string $stateCode
 * @property string $stateName
 * @property string $countryCode
 * @property string $countryName
 *
 * @property Location[] $locations
 * @property Media[] $media
 */
class Geography extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%geography}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['geographyId', 'cityCode', 'cityName', 'stateCode', 'stateName', 'countryCode', 'countryName'], 'required'],
            [['geographyId'], 'string', 'max' => 21],
            [['cityCode', 'stateCode', 'countryCode'], 'string', 'max' => 3],
            [['cityName', 'stateName'], 'string', 'max' => 42],
            [['countryName'], 'string', 'max' => 60],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'geographyId' => Yii::t('app', 'Geography ID'),
            'cityCode' => Yii::t('app', 'City Code'),
            'cityName' => Yii::t('app', 'City Name'),
            'stateCode' => Yii::t('app', 'State Code'),
            'stateName' => Yii::t('app', 'State Name'),
            'countryCode' => Yii::t('app', 'Country Code'),
            'countryName' => Yii::t('app', 'Country Name'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLocations()
    {
        return $this->hasMany(Location::className(), ['geographyId' => 'geographyId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['geographyId' => 'geographyId']);
    }
}
