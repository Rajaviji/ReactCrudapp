import { FaMoon, FaSun } from "react-icons/fa"
import { motion } from "framer-motion"
import { PopInAnim } from "../commons/anims"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../store/theme/actions"

const DarkModeSwitch = ({ rotate= "0", anim= true }) => {

    const isDarkMode = useSelector(state => state.theme.themeMode === 'dark')
    const dispatch = useDispatch()

    const toggleMode = () => {
        dispatch(setTheme(isDarkMode ? 'light' : 'dark'))
    }

    return (
        <div className="inline-block">
            <motion.div variants={ anim ? PopInAnim : {} } initial="hidden" animate="visible" className={ `ring-1 ring-offset-1 ${isDarkMode ? 'bg-black ring-white ring-offset-black' : 'bg-gray-300 ring-black'} w-12 h-5 rounded-full flex content-center relative transition-all duration-500 cursor-pointer` } onClick={ toggleMode }>
                <FaSun style={{ width: "12px", height: "auto" }} className={ `absolute left-1.5 top-1 text-yellow-400 z-10` } />
                <div className={ `absolute bg-tcolor h-5/6 w-4 inline-block mt-0.5 mx-1 rounded-full transition-all duration-500 ${isDarkMode ? 'left-2/4' : 'left-0'}` }></div>
                <FaMoon style={{ width: "12px", height: "auto" }} className={ `absolute right-1.5 top-1 text-black z-10 transform ${rotate === '270' ? '-rotate-90' : ''}` } />
            </motion.div>
        </div>
    )
}

export default DarkModeSwitch