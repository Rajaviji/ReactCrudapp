import { motion } from "framer-motion"
import { PopInAnim, wrapAnim } from "../commons/anims"


const IntroLoader = () => {
    return (
        <motion.div variants={ wrapAnim } initial="hidden" animate="visible" className="h-screen fixed top-0 left-0 right-0 flex flex-col justify-center items-center bg-gray-100 dark:bg-ddark">
            {/* <LogoImg size="250px" /> */}
            <motion.svg variants={ PopInAnim } xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g transform="translate(26.666666666666668,26.666666666666668)">
                    <rect x="-20" y="-20" width="40" height="40" fill="#e15b64">
                        <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.3s"></animateTransform>
                    </rect>
                </g>
                <g transform="translate(73.33333333333333,26.666666666666668)">
                    <rect x="-20" y="-20" width="40" height="40" fill="#f47e60">
                        <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.2s"></animateTransform>
                    </rect>
                </g>
                <g transform="translate(26.666666666666668,73.33333333333333)">
                    <rect x="-20" y="-20" width="40" height="40" fill="#f8b26a">
                        <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="0s"></animateTransform>
                    </rect>
                </g>
                <g transform="translate(73.33333333333333,73.33333333333333)">
                    <rect x="-20" y="-20" width="40" height="40" fill="#abbd81">
                        <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.1s"></animateTransform>
                    </rect>
                </g>
            </motion.svg>
        </motion.div>
    )
}

export default IntroLoader