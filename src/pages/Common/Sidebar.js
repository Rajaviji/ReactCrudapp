import {Link,withRouter} from 'react-router-dom';
import {motion} from 'framer-motion'
import {ImHome} from 'react-icons/im'
import {GoSignOut} from 'react-icons/go'
import { AiFillFileAdd, AiOutlineMenuFold } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { TextAnimateXRev, TextAnimateY, wrapAnim } from "../../commons/anims"
import FlowText from "../../components/FlowText"
import DarkModeSwitch from '../../components/DarkModeSwitch'
import { useDispatch, useSelector } from "react-redux"
import { setLoggedIn } from "../../store/auth/actions"
import { CombinedRoutes } from "../../routes/Routes"
import { HomeMenu } from "../../routes/Homemenu"
import { setSidebar } from "../../store/theme/actions"



const HomeMenuList = HomeMenu.filter(c =>c.sidebar)

const intialAnime = {
    hidden :{
        opacity : 0,
        x : '-100vw',
    },
    visible : {
        x: 0,
        opacity: 1,
        transition: {
            type: 'easeOut',
            duration: 0.8
        }
    }
}

let xStart = 0;
let yStart = 0;

const SideBar = ({ history }) => {

    const [highlighted, setHighlighted] = useState(HomeMenuList[0].title)
    const sideBar = useSelector(state => state.theme.sideBar)
    const [sideBarExpanded, setSideBarExpanded] = useState(false)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.auth.userDetails)
    const [addReferralDialog, setAddReferralDialog] = useState(false)
    const filteredCombinedRoutes = useMemo(() => (
        CombinedRoutes.filter(c => c.roles === undefined || c.roles.some(e => userDetails !== undefined && userDetails.role !== undefined && userDetails?.role.includes(e)))
    ), [userDetails])// eslint-disable-line

    const logout = () => {
        dispatch(setLoggedIn(false))
    }
    const isPathIcon = (title) => {
        if (history.location.pathname !== '/') {
            for (let route of filteredCombinedRoutes) {
                if (history.location.pathname.includes(route.link) && route.menu === title) return true
            }
        }
        return false
    }
    const selectedMainMenu = useMemo(() => {
        return HomeMenuList.find(c => c.title === highlighted)
    }, [highlighted])// eslint-disable-line
    const sideMenuList = useMemo(() => {
        let menu = HomeMenuList.find(c => c.title === highlighted)
        return menu ? filteredCombinedRoutes.filter(c => c.menu === menu.title) : []
    }, [highlighted])// eslint-disable-line
    const hideSidebar = () => dispatch(setSidebar(false))
    const showSideBar = () => dispatch(setSidebar(true))
    const dragStart = ev => {
        if (ev.changedTouches === undefined) return
        xStart = ev.changedTouches[0].screenX
        yStart = ev.changedTouches[0].screenY
    }
    const dragEnd = ev => {
        if (ev.changedTouches === undefined) return
        let xEnd = ev.changedTouches[0].screenX
        if (Math.abs(yStart - ev.changedTouches[0].screenY) > 100) return
        let diff = xStart - xEnd
        if (xStart > window.innerWidth / 2 && diff > 150) hideSidebar()
        else if (xStart < 1000 && diff < -150) showSideBar()
    }
    const setHighlightedMenu = () => {
        let found = false
        filteredCombinedRoutes.forEach((c, i) => {
            if (c.link === history.location.pathname) {
                if (!c.menu) return
                found = true
                setHighlighted(c.menu)
            }
        })
        if (!found) setHighlighted(HomeMenuList[0].title)
    }
    const expandSideBar = () => setSideBarExpanded(true)
    const shrinkSideBar = () => setSideBarExpanded(false)

    useEffect(() => {
        hideSidebar()
    }, [history.location.pathname]) // eslint-disable-line
    // set initially highlighted
    useEffect(() => {
        if (!sideBar || !sideBarExpanded)
            setHighlightedMenu()
    }, [sideBar, sideBarExpanded]) // eslint-disable-line
    useEffect(() => setHighlightedMenu(), []) // eslint-disable-line
    useLayoutEffect(() => {
        window.addEventListener('touchstart', dragStart)
        window.addEventListener('dragstart', dragStart)
        window.addEventListener('touchend', dragEnd)
        window.addEventListener('dragend', dragEnd)

        return () => {
            window.removeEventListener('touchstart', dragStart)
            window.removeEventListener('dragstart', dragStart)
            window.removeEventListener('touchend', dragEnd)
            window.removeEventListener('dragend', dragEnd)
        }
    }, []) // eslint-disable-line

    return (
        <>
            <div className="hidden lg:block md:w-[56px] flex-shrink-0"></div>
            <div className={`w-[320px] ${sideBarExpanded ? '' : 'lg:w-[56px]'} bg-bluegray-200 dark:bg-ddark flex flex-col items-center h-full shadow-xl flex-shrink-0 fixed lg:left-0 top-0 bottom-0 z-10 transition-all duration-200 ${sideBar ? 'left-0' : '-left-96'}`} onMouseEnter={expandSideBar} onMouseLeave={shrinkSideBar} >
                <div className="border-b w-full border-blue-200 dark:border-gray-700 flex justify-center py-4 items-center h-[80px] relative">
                    {/* <Link to="/">
                        <LogoImg size={sideBarExpanded || sideBar ? '120px' : '40px'} symbol={!sideBarExpanded && !sideBar} />
                    </Link> */}
                    <AiOutlineMenuFold size="25px" className="absolute right-5 cursor-pointer text-tcolor dark:text-white lg:hidden" onClick={hideSidebar} />
                </div>
                <motion.div variants={wrapAnim} initial="hidden" animate="visible" className="flex w-full overflow-y-auto overflow-x-hidden h-full relative">
                    <div className="h-full flex flex-col justify-center border-r border-blue-200 dark:border-gray-700 w-14 flex-shrink-0 z-20">
                        <div className="flex-1 flex flex-col justify-start">
                            <Link to="/">
                                <motion.span variants={TextAnimateY} className={`flex justify-center cursor-pointer group relative  py-3 my-6 rounded-2xl mx-1 ${history.location.pathname === '/' ? 'bg-tcolor text-white' : 'text-gray-600 dark:text-gray-400'}`} title="Dashboard">
                                    <ImHome size="22px" className=" group-hover:animate-pulse" />
                                </motion.span>
                            </Link>
                            {
                                HomeMenuList.map((c, i) => {
                                    return (
                                        <motion.span key={i} variants={intialAnime} className={`flex my-0.5 justify-center cursor-pointer group relative rounded-2xl mx-1 ${isPathIcon(c.title) ? 'bg-tcolor text-white' : highlighted === c.title ? 'text-tcolor dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`} onMouseEnter={() => setHighlighted(c.title)} onClick={() => setHighlighted(c.title)} title={c.subtitle}>
                                            <c.TitleIcon size="22px" className={`my-3`} />
                                        </motion.span>
                                    )
                                })
                            }
                        </div>
                        {/* {(((userDetails.role) && (userDetails.role[0] === 'referrer')) || ((userDetails.role) && (userDetails.role.includes('referrer')))) ? <motion.span variants={TextAnimateY} className="flex justify-center cursor-pointer group relative  py-3 my-3 rounded-2xl mx-1 text-gray-600 dark:text-gray-400" title={'Add New Referral'} onClick={() => history.push('/referrer')}>
                            <div>
                                <AiFillFileAdd size="25px" />
                            </div>
                        </motion.span> : ''}
                        <motion.span variants={TextAnimateY}>
                            <div className="inline-block mb-7 mr-1">
                                <ReportSelector injectPopupClass="left-12 top-0" originX="left" originY="top" />
                            </div>
                        </motion.span>
                        <motion.span variants={TextAnimateY}>
                            <div className="inline-block mb-8 mr-2">
                                <OrganizationSelector injectPopupClass="left-12 top-0" originX="left" originY="top" />
                            </div>
                        </motion.span>
                        <motion.span variants={TextAnimateY}>
                            <div className="inline-block mb-8 mr-2">
                                <LanguageSelector injectPopupClass="left-12 top-0" originX="left" originY="top" />
                            </div>
                        </motion.span> */}
                        <motion.span variants={TextAnimateY}>
                            <div className="transform rotate-90 inline-block mb-8 mr-2">
                                <DarkModeSwitch rotate="270" />
                            </div>
                        </motion.span>
                        <motion.span variants={TextAnimateY} className="flex my-2 justify-center cursor-pointer group relative text-white mb-12" onClick={logout} title="Logout">
                            <GoSignOut size="25px" className="text-gray-600 dark:text-gray-400 group-hover:animate-pulse" />
                        </motion.span>
                        <motion.span variants={TextAnimateXRev} className={`hidden lg:flex my-2 justify-center cursor-pointer group absolute -bottom-10 right-1 text-white mb-12 bg-bluegray-300 dark:bg-bluegray-700 rounded-full`} onClick={() => sideBarExpanded ? shrinkSideBar() : expandSideBar()}>
                            <span className={`transform transition-all duration-200 ${sideBarExpanded ? 'rotate-180' : ''}`}>
                                <MdKeyboardArrowRight size="20px" className={`text-gray-600 dark:text-white group-hover:animate-pulse`} />
                            </span>
                        </motion.span>
                    </div>
                    <div className={`flex flex-col bg-bluegray-200 dark:bg-ddark w-full pb-10 pt-5 px-2 overflow-y-auto overflow-x- ${sideBarExpanded ? 'block' : 'lg:hidden'}`}>
                        <div className="mb-5 text-blue-500 dark:text-yellow-600 text-sm font-bold">
                            <FlowText text={selectedMainMenu.title} />
                        </div>
                        {
                            sideMenuList.map((c, i) => {
                                return (
                                    <Link key={`${i}`} to={c.link} className="block z-10 my-1 text-left">
                                        <motion.span variants={TextAnimateY} className={`flex items-center py-1 pl-2 hover:rounded hover:bg-tcolor dark:hover:bg-gray-500 cursor-pointer hover:text-white dark:hover:text-blue-200 text-xs ${history.location.pathname === c.link ? 'text-tcolor font-bold' : 'text-gray-600 dark:text-gray-300'}`}>
                                            <c.ItemIcon size="14px" className="mr-2" />
                                            {c.title}
                                        </motion.span>
                                    </Link>
                                )
                            })
                        }
                        {/* <img src={highlighted === 'Content' ? img1 : img2} alt="img" className="absolute bottom-0 opacity-5 w-64 mb-5" /> */}
                        <div className="pb-5"></div>
                    </div>
                </motion.div>
                {/* <Dialog title='Add Carereceivers' showDialog={addReferralDialog} onClose={() => setAddReferralDialog(false)}>
                    <AddReferral onClose={() => setAddReferralDialog(false)} />
                </Dialog> */}
            </div>
        </>
    )
}

export default withRouter(SideBar)