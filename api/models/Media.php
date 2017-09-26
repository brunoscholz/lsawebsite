<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%media}}".
 *
 * @property string $mediaId
 * @property string $imageId
 * @property string $videoId
 * @property string $schoolId
 * @property string $studentId
 * @property string $instructorId
 * @property string $courseId
 * @property string $geographyId
 * @property string $userId
 *
 * @property User $user
 * @property Course $course
 * @property Geography $geography
 * @property Image $image
 * @property Instructor $instructor
 * @property School $school
 * @property Student $student
 * @property Video $video
 */
class Media extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%media}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['mediaId'], 'required'],
            [['mediaId', 'imageId', 'videoId', 'schoolId', 'studentId', 'instructorId', 'courseId', 'geographyId', 'userId'], 'string', 'max' => 21],
            [['userId'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['userId' => 'userId']],
            [['courseId'], 'exist', 'skipOnError' => true, 'targetClass' => Course::className(), 'targetAttribute' => ['courseId' => 'courseId']],
            [['geographyId'], 'exist', 'skipOnError' => true, 'targetClass' => Geography::className(), 'targetAttribute' => ['geographyId' => 'geographyId']],
            [['imageId'], 'exist', 'skipOnError' => true, 'targetClass' => Image::className(), 'targetAttribute' => ['imageId' => 'imageId']],
            [['instructorId'], 'exist', 'skipOnError' => true, 'targetClass' => Instructor::className(), 'targetAttribute' => ['instructorId' => 'instructorId']],
            [['schoolId'], 'exist', 'skipOnError' => true, 'targetClass' => School::className(), 'targetAttribute' => ['schoolId' => 'schoolId']],
            [['studentId'], 'exist', 'skipOnError' => true, 'targetClass' => Student::className(), 'targetAttribute' => ['studentId' => 'studentId']],
            [['videoId'], 'exist', 'skipOnError' => true, 'targetClass' => Video::className(), 'targetAttribute' => ['videoId' => 'videoId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'mediaId' => Yii::t('app', 'Media ID'),
            'imageId' => Yii::t('app', 'Image ID'),
            'videoId' => Yii::t('app', 'Video ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'studentId' => Yii::t('app', 'Student ID'),
            'instructorId' => Yii::t('app', 'Instructor ID'),
            'courseId' => Yii::t('app', 'Course ID'),
            'geographyId' => Yii::t('app', 'Geography ID'),
            'userId' => Yii::t('app', 'User ID'),
        ];
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
    public function getCourse()
    {
        return $this->hasOne(Course::className(), ['courseId' => 'courseId']);
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
    public function getImage()
    {
        return $this->hasOne(Image::className(), ['imageId' => 'imageId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInstructor()
    {
        return $this->hasOne(Instructor::className(), ['instructorId' => 'instructorId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchool()
    {
        return $this->hasOne(School::className(), ['schoolId' => 'schoolId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(Student::className(), ['studentId' => 'studentId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVideo()
    {
        return $this->hasOne(Video::className(), ['videoId' => 'videoId']);
    }
}
