import { BrickType } from "./BrickType"

export default function Brick( {brick}: { brick: BrickType } ) {

    return (
        <div style={{
            width: brick.width,
            height: brick.height,
            top: brick.y,
            left: brick.x,
        }}>
        {brick.hitsRemaining === 5 && <div className="bg-red-500 h-full w-full"></div>}
        {brick.hitsRemaining === 4 && <div className="bg-orange-500 h-full w-full"></div>}
        {brick.hitsRemaining === 3 && <div className="bg-yellow-500 h-full w-full"></div>}
        {brick.hitsRemaining === 2 && <div className="bg-green-500 h-full w-full"></div>}
        {brick.hitsRemaining === 1 && <div className="bg-blue-500 h-full w-full"></div>}
        </div>
    )
}