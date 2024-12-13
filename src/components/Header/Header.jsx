import React, { useState } from 'react'
import '../../App.css'
import { useDispatch } from 'react-redux'
import { Container } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import { logout } from '../../store/authSlice'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const logoutHandler = async () => {
        setError('')
        setLoading(true);
        try {
            const userdata = await authService.logoutService()
            console.log(userdata)
            navigate('/')
            dispatch(logout(userdata));
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    const searchProfile = async (username) => {
        setError('')
        setLoading(true);
        try {
            navigate(`/profile/${username}`);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const username = e.target.elements.username.value; // Get the username from the input
        searchProfile(username); // Call the searchProfile function
    };

    const navItems = [
        {
            name: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M8.9995 22L8.74887 18.4911C8.61412 16.6046 10.1082 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2501 18.4911L14.9995 22" stroke="currentColor" stroke-width="1.5" />
                <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>),
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/register',
            active: !authStatus
        },
        {
            name: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>),
            slug: '/add-post',
            active: authStatus
        },
        {
            name: 'Profile',
            slug: '/profile',
            active: authStatus
        }
    ]
    return (
        <header className='bg-zinc-950 text-white border-b-2 border-zinc-700 sticky top-0'>
            <Container>
                <nav className='flex justify-between px-4 py-1 '>
                    <div>
                        <Link to='/'>
                            <img className='w-14 rounded-full hover:shadow-md hover:shadow-white/5' src="data:image/png;base64,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" alt="user">
                            </img>
                        </Link>
                    </div>
                    <div className='flex items-center '>
                        <form onSubmit={handleSearchSubmit} className='flex items-center gap-2 '>
                            <input name='username' className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" placeholder='Search...' />
                            <button type='submit'>
                                <svg className='cursor-pointer hover:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#525b56" fill="none">
                                    <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <ul className='flex items-center gap-6 font-semibold'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li onClick={() => navigate(item.slug)} className=' cursor-pointer border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1' key={item.name}>
                                    {item.name}
                                </li>
                            ) : null
                        )}
                        {authStatus ? (
                            <li className='cursor-pointer border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1'>
                                <button onClick={logoutHandler} disabled={loading}>
                                    {loading ? 'Logging out...' : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                        <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>)}
                                </button>
                            </li>
                        ) : null}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
