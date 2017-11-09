<?php

namespace app\models;

use Yii;
use yii\web\UploadedFile;
use yii\imagine\Image as imImage;
use Imagine\Image\Box;

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
     * @var UploadedFile[]
     */
    public $imageLarge;
    public $imageThumb;

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
            [['imageLarge'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg'],
            [['imageThumb'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg'],
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

    public static function findById($id)
    {
        return static::find()
            ->where(['like binary', 'pictureId', $id])
            ->one();
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['imageId' => 'imageId']);
    }

    public function getPath($type)
    {
        return Yii::getAlias('@api/web') . $this->$type;
    }

    public function upload($folder = 'userpics')
    {
        // the path to save file, you can set an uploadPath
        // in Yii::$app->params (as used in example below)                       

        // delete old file!!!!!

        if ($this->validate()) {
            $path = '/uploads/'.$folder.'/';
            $basePath = Yii::$app->basePath . '/../api/web';

            if(isset($this->imageLarge) && !empty($this->imageLarge))
            {
                $name = Yii::$app->security->generateRandomString() . '.' . $this->imageLarge->extension;
                $this->large = $path.$name;
                $this->doResize($this->imageThumb->tempName, 'LARGE_SIZE', $basePath . $this->large);
            }

            if(isset($this->imageThumb) && !empty($this->imageThumb))
            {
                $name = Yii::$app->security->generateRandomString() . '.' . $this->imageThumb->extension;
                $this->thumb = $path.$name;
                //$this->imageThumb->saveAs($basePath . $this->thumbnail);
                $this->doResize($this->imageThumb->tempName, 'THUMB_SIZE', $basePath . $this->thumb);
            }

            $this->imageLarge = $this->imageThumb = null;
            $this->save();
            return true;
        } else {
            return false;
        }
    }

    public function doResize($resizeImagePath, $type, $thumbImagePath)
    {
        list($width, $height) = $this->sizeArray[$type];

        $mem_limit = ini_get ('memory_limit');
        //ini_set ('display_errors', false);
        ini_set ('memory_limit', '400M');

        $imagine = imImage::getImagine()
            ->open($resizeImagePath)
            ->thumbnail(new Box($width, $height))
            ->save($thumbImagePath, ['quality' => 90]);
            //->save(Yii::getAlias('@runtime/thumb-test-photo.jpg'), ['quality' => 80]);

        ini_set ('memory_limit',$mem_limit);
    }

    public $sizeArray = [
        'LARGE_SIZE' => [592, 396],
        'THUMB_SIZE' => [256, 256],
    ];

    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert))
        {
            // ...custom code here...
            //http://ondetem-gn.com.br/uploads/userpics/4xsJ18K4J7dXr74jlWK_U--lvTY7tyF6.png
            $this->thumb = str_replace('http://bookingaus.tk', '', $this->thumb);
            $this->large = str_replace('http://bookingaus.tk', '', $this->large);

            return true;
        } else {
            return false;
        }
    }

    public function afterFind()
    {
        if(is_null($this->thumb) || empty($this->thumb))
            $this->thumb = 'assets/img/generic-avatar.png';
        elseif (strpos($this->thumb, 'generic') != true)
            $this->thumb = $this->thumb;
        
        if(is_null($this->large) || empty($this->large))
            $this->large = 'assets/img/generic-cover.jpg';
        elseif (strpos($this->large, 'generic') != true)
            $this->large = $this->large;
    }
}
