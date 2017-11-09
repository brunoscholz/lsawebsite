<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%location}}".
 *
 * @property string $locationId
 * @property string $geographyId
 * @property string $address
 * @property string $address2
 * @property string $streetNumber
 * @property string $formattedAddress
 * @property string $neighborhood
 * @property string $postCode
 * @property double $latitude
 * @property double $longitude
 * @property string $remarks
 * @property string $status
 *
 * @property Geography $geography
 * @property Relationship[] $relationships
 * @property School[] $schools
 * @property Schoolcampi[] $schoolcampis
 * @property Student[] $students
 */
class Location extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%location}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['locationId', 'address', 'streetNumber', 'formattedAddress', 'latitude', 'longitude'], 'required'],
            [['latitude', 'longitude'], 'number'],
            [['remarks'], 'string'],
            [['locationId', 'geographyId'], 'string', 'max' => 21],
            [['address', 'address2', 'formattedAddress'], 'string', 'max' => 100],
            [['streetNumber'], 'string', 'max' => 6],
            [['neighborhood'], 'string', 'max' => 60],
            [['postCode'], 'string', 'max' => 15],
            [['status'], 'string', 'max' => 3],
            [['geographyId'], 'exist', 'skipOnError' => true, 'targetClass' => Geography::className(), 'targetAttribute' => ['geographyId' => 'geographyId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'locationId' => Yii::t('app', 'Location ID'),
            'geographyId' => Yii::t('app', 'Geography ID'),
            'address' => Yii::t('app', 'Address'),
            'address2' => Yii::t('app', 'Address 2'),
            'streetNumber' => Yii::t('app', 'Street Number'),
            'formattedAddress' => Yii::t('app', 'Formatted Address'),
            'neighborhood' => Yii::t('app', 'Neighborhood'),
            'postCode' => Yii::t('app', 'Post Code'),
            'latitude' => Yii::t('app', 'Latitude'),
            'longitude' => Yii::t('app', 'Longitude'),
            'remarks' => Yii::t('app', 'Remarks'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGeography()
    {
        return $this->hasOne(Geography::className(), ['geographyId' => 'geographyId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationships()
    {
        return $this->hasMany(Relationship::className(), ['locationId' => 'locationId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchools()
    {
        return $this->hasMany(School::className(), ['locationId' => 'locationId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolcampis()
    {
        return $this->hasMany(Schoolcampi::className(), ['locationId' => 'locationId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudents()
    {
        return $this->hasMany(Student::className(), ['locationId' => 'locationId']);
    }
}
