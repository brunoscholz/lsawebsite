<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "{{%student}}".
 *
 * @property string $studentId
 * @property string $userId
 * @property string $name
 * @property integer $birthday
 * @property string $phone
 * @property string $emergencyPhone
 * @property string $locationId
 * @property string $status
 *
 * @property Courseenroll[] $courseenrolls
 * @property Media[] $media
 * @property Payments[] $payments
 * @property Rating[] $ratings
 * @property Relationship[] $relationships
 * @property Location $location
 * @property User $user
 */
class Student extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%student}}';
    }

    /**
     * @inheritdoc
     */
    /*public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }*/

    public function fields()
    {
        $fields = [
            'studentId',
            'userId',
            'name',
            'birthday',
            'phone',
            'emergencyPhone',
            'locationId',
            'status',
            'images',
            'location',
            'courseEnrolls',
        ];
        return $fields;
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['studentId', 'name', 'phone', 'emergencyPhone'], 'required'],
            [['birthday'], 'integer'],
            [['studentId', 'userId', 'phone', 'emergencyPhone', 'locationId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 80],
            [['status'], 'string', 'max' => 3],
            [['locationId'], 'exist', 'skipOnError' => true, 'targetClass' => Location::className(), 'targetAttribute' => ['locationId' => 'locationId']],
            [['userId'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['userId' => 'userId']],
        ];
    }

    public function scenarios() 
    {
       $scenarios = parent::scenarios(); 
       $scenarios['register'] = ['userId', 'status']; 
       return $scenarios; 
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'studentId' => Yii::t('app', 'Student ID'),
            'userId' => Yii::t('app', 'User ID'),
            'name' => Yii::t('app', 'Name'),
            'birthday' => Yii::t('app', 'Birthday'),
            'phone' => Yii::t('app', 'Phone'),
            'emergencyPhone' => Yii::t('app', 'Emergency Phone'),
            'locationId' => Yii::t('app', 'Location ID'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseEnrolls()
    {
        return $this->hasMany(CourseEnroll::className(), ['studentId' => 'studentId'])
            ->with('payments');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['studentId' => 'studentId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImages()
    {
        return $this->hasMany(Image::className(), ['imageId' => 'imageId'])
            ->via('media');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPayments()
    {
        //return $this->hasMany(Payments::className(), ['studentId' => 'studentId']);
        return $this->hasMany(Payments::className(), ['studentId' => 'studentId'])
            ->via('courseEnrolls');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRatings()
    {
        return $this->hasMany(Rating::className(), ['studentId' => 'studentId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationships()
    {
        return $this->hasMany(Relationship::className(), ['studentId' => 'studentId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLocation()
    {
        return $this->hasOne(Location::className(), ['locationId' => 'locationId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['userId' => 'userId']);
    }
}
