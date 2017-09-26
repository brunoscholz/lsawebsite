<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%instructor}}".
 *
 * @property string $instructorId
 * @property string $userId
 * @property string $name
 * @property string $about
 * @property string $expertise
 * @property integer $rating
 * @property string $status
 *
 * @property Courseinstructor[] $courseinstructors
 * @property User $user
 * @property Media[] $media
 * @property Rating[] $ratings
 */
class Instructor extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%instructor}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['instructorId', 'name', 'about', 'expertise', 'rating'], 'required'],
            [['rating'], 'integer'],
            [['instructorId', 'userId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 80],
            [['about', 'expertise'], 'string', 'max' => 255],
            [['status'], 'string', 'max' => 3],
            [['userId'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['userId' => 'userId']],
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        $fields[] = 'courseinstructors';
        $fields[] = 'user';
        $fields[] = 'media';
        $fields[] = 'ratings';
        
        return $fields;
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'instructorId' => Yii::t('app', 'Instructor ID'),
            'userId' => Yii::t('app', 'User ID'),
            'name' => Yii::t('app', 'Name'),
            'about' => Yii::t('app', 'About'),
            'expertise' => Yii::t('app', 'Expertise'),
            'rating' => Yii::t('app', 'Rating'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseinstructors()
    {
        return $this->hasMany(Courseinstructor::className(), ['instructorId' => 'instructorId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['userId' => 'userId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['instructorId' => 'instructorId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRatings()
    {
        return $this->hasMany(Rating::className(), ['instructorId' => 'instructorId']);
    }
}
