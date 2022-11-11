import pic0 from '../../images/home-rnd-pics/194.jpg'
import pic1 from '../../images/home-rnd-pics/227.jpg'
import pic2 from '../../images/home-rnd-pics/328.jpg'
import pic3 from '../../images/home-rnd-pics/522.jpg'
import pic4 from '../../images/home-rnd-pics/877.jpg'

export default function PicturePane() {
    const randomPics = [pic0, pic1, pic2, pic3, pic4]
    const randomNum = Math.floor(Math.random() * 5)
    console.log(randomNum)
    return (
        <img className="tint leftside" src={randomPics[randomNum]} width="400" height="400" />
    )
}