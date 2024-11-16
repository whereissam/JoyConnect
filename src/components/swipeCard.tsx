import TinderCard from 'react-tinder-card';
import circle_icon from '@/assets/circle.svg';
import cross_icon from '@/assets/cross.svg';
import Image from 'next/image'
// ...

export const SwipeCard = (props: { videoUrl: string, onSwipe: (direction: any) => void}) => {
    const onSwipe = (direction: any) => {
        console.log(direction);
        props.onSwipe(direction);
    }

    const onCardLeftScreen = (myIdentifier: any) => {
        alert(myIdentifier + ' left the screen')
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <TinderCard
            onSwipe={onSwipe}
            // onCardLeftScreen={(direction) => onSwipe(direction)}
            preventSwipe={['top', 'down']}
            swipeThreshold={400}

            // preventSwipe={['right', 'left']}
        >
            <div className='w-[400px] bg-white py-4 px-5 rounded-lg'>

                <video controls className='mb-5 w-full'>
                    <source src={props.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="flex justify-between px-5">
                    <Image src={cross_icon} alt="dislike" width={50} height={50} onClick={() => onSwipe('left')}/>
                    <Image src={circle_icon} alt="like" width={50} height={50} onClick={() => onSwipe('right')}/>
                </div>
            </div>
        </TinderCard>
    )
}