import React, { useState } from 'react'
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

    const navItems = [
        {
            name: 'Home',
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
            name: 'Add',
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
                            <img className='w-14 rounded-full hover:shadow-md hover:shadow-white/5' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKD0lEQVR4nO2beXAT1x3H35TdfdI+ScYG+cRoRRNo0uYPStLpJM2kEwiSTNMUg2zLMDTQKYMTzlII2JJhgBJIuEIpwkCmscEJ6DAMMQlXDgIEc3QgAZtAQkIopIAlsGxJvvXrvAVjAwYM1rGy+c58xxp53773+/j3jv1JRuiRHqlbS6FAvQnLZvAcayWYO6zAzGUes36C2WaC2XqCmSsEMxVyjlnHcz3SEELySI9ZCvqZnOOGE8x9yWO2ToHZaqWMCyjlGFS8DFQ3fipvGgP9PcGch3BsNc8xsxFCPOqO4rkewwjHXCAUWguwB7FcBgoZ6yccc56w7FOouygWoRiCmQ8JZr0PBe42K+U4QDi2Ri5nfou6ujDGWsIxFxUyXN9ZcLdBBMKxHplMpkFdVRjjfoRj3Eo5bg4mvJsQZVwTwew+1BWlQiiOcMxPdLqFAl6LCWZrCWYbeI65xHOMTc5xr9CNCkW7eBmzSyHHDaGE13ZzUYrGFKiHyJgfFDLmdyhapeA4I5Gx3rDAu9smg1kvwcwkFIVi6QE4GLttZ81j1kP/mCiaRFh2tAJzEcu+O9ZIjvXI5fI+KFrEY+akFLKvxQoZV0s4phBFg2QyWSrBrD/S0NqaPg4SjvUpFEiNpC4es2OJhKbvzSzE3FXCsiYkdSk4plgRpukbw8uhJ+lgFsoxKDjGhqQuHjMnVHzoAVIg8T1V8Nyvn4SEOFWHricy5hskdRGOuaYM+Zp2Hd7HGxZD4L+fg/UfU0EdoxQh3b0dPWAzV5DUxWO2LpTw4pQ8JPXuCZ9uXg5wYe9N7ytZCQmxMSKou7WlBVokdRHMhqZoIMeQ2KsnPDvwCThXZrsFXosPla4BdU+aie1lrQiwEUldPGZrg7kGKmUYktWxICSr4YNVFnHKtgevxTbrXFDHKtsHyLFVSOoiHOOiD/YdA4TFzLru61mmlHEQpyIitLgYArrnn4bS9xZB04+f3RNcW/9p6LMQq+TvWDcJZs8hqYvImNP3ykAKSYSjIuKU7C8kwzNP9Qfd84NgzPAhMOs1E6yaPxkOblsNDec+6TC0tj5/2C7ev51deCeSugjLOO62G6p7KsTsoBl1rbz0oeB01PoXnrllV1bIcZOc7TEPSV08x8wkMu6W0j2dTnQNK/vQGlJobW23zoWk2NZpTDBXJee4l5HURXCP3xPMVrUFGB+rgjNfbAwbPOofDm6G+JjWMdDNLU4skktfMnoWbDlM91LKwTx5dFjhUdee3Q0xPNe6/mGmHEWLeqtkJ1vOYklxPBzf+W7YAVITzLbs9oEnUlXrUDTI5UgfsuDVgfW9bhwjYhUYPKc+iijAxDgFlM4f7K+0GV9EUpfbaao4XZIHvW8cI2gQkYDXChBD7xgCNfvfAleJ6SSSulwOY0PgZCEMHNC35ROyiAMc8/JzEDhRCC67sQFJXS5Hpj9w4j0omDMOEmKVEQeY1CsGdq+fBYET/waXI8OHpC6Xw3Si4cgKuFa2VpzGkQaYEKuChq+LoOHIcnA7TV8hqcvlyDDX7J7uh4piyND9JuIAczIHAx1LzZ6/+Vx2Yy6Sui7bjIl0qjR/tR6O2hdEHOAx50KgY6Fj+slmlP6HSlRue8YCz/YcL5QXg8s+MmIAxb7Li6Fq+wSv25Eh/efgFsFnLzDuksyy6l1T/W5nFgTO7wk7vMCPe4D2Xb1zit/lyPqSjglFky5u+wPvdmZtcZWYAs1nQ1t5ac9NZ7eB25kdcDtNzvM2Y/R+r9pdMur7xlObwg6wsWITuLeO+g5Fu1zOrALfoeXN4QboK1vW7HJmrUbRrkr7iFeqdkyqCjfAqo8nVlU60qVf/7ufXBtGqVyOTF/z9+ErKDSf3Q60z8qtf1SiriCXM9PqPbCwPlwAvfsX1LudWf9EXUXXbEat22kKSxaK2efM8l91pHetb+67nab5nl1TvaEG6Nk1rcZtN81FXU1QMJ51O7PP+I+saAwVPP/hFY1uR/Zp2hfqinLZjCkup+lS7X/WBP1YU3usgB5bKrvc1L1dlTbjAJcz86qvbCnAhXt/TaNj/hx8ZW/Tdc99xZH+OOoOctmMKe4SE1R/MkNc9B9+wyiF6j0z6CMbVL6flYy6k1z2keDbawH3llHgO/DmA4Gk1/oOLLzedq9FrLqg7iYXLTVVFEPz1++C99M3RBieHZOg7njBXcHVHVsLnh0TxWtpG9qW3qNbA4QWl2+A+kNLoKr0r1C9ezo0lBeLJSlq+pq+V1U6HuoPLRWvbdv2EcCKVhiB8iKo3T+fFkHFeh511UcTxPduB9dtAGrS5iT2Gzo7W6O3rNEMyy/TGPIv3ZGBnTC9F70nvbegN1v76fJMtE8UzUoePKuXYDBP0aTlf6M1WGpTRy72pIy1BhInFELClE3Xy+0VG4MAcKN4L3rPpJxCSH7VGkgdsdijNZhrBYPllKCzTKZjQdGix/Rz+tAs0Oot/tSMpd7EnCJQz9wC6plbb/H+ohzw7pvXaYC+L+bB/g05d9yf9pmYUwh0DHQsgsG8us+w3BQkVQ0aNJ7tp7OYtXqzL2X0yvr4afZ2gmr10/lFcN42ChqPrnxoeA1H34HzttEwyLLhnn3RsaSMWllHx6YxmGfTsSIpSdCZBwgG87ep6Yu88VM23zOYth42vwAu2EZDw+FlDw7v8DKxrWF+QYf7o9O874hFXsFgOaM1zOqPpCDtS+aRgsFckzSuoLmjgbT1kHnr4LvNY8C9e7b49Yv7gaPXXN3zhthm8Lz1D9wfndrJ4wqa6Jg1OnN6ROFp9LnjBEO+P/H1jQ8RSKv7526GNWty4aI9Gyp3/h3qy5ZA0/G1EDhZJJq+rqfPuztniNdYrXnweG7HM709J04sBjr2vrq81yMEz/KakDbX9yBT9n7+lfl9mLp0MewunAynNo2D/9mzRNPX9L0pS9+CX+Z9ELT+EqZuBhqDRmeZEPZpqzFYfHRNCVYwkTKNQTBYfJqXLMPDAu/nQ2c9JhgsXjoF1BIAEBSIE4tBa7B4NUNn/yKk8J40zuEEg+Xb5HFrH2rDUEvYyX8paBL05tMhPeLQc17f9EU1kQ5WHSL3TX/T209vmRUSePQUTw+i8dNsEQ9UHSLTDZHG2FeXmxR0gII+z5qS/U5tpINUh9gp2SvqNHrLqqDCow/j9Hnyfo9n6i5gGiONNagFCFpV6ZOxxBvp4NRhcqpxiVdrsEwMGkDNsPzTSWJVZWu3cGJOEQhp+aeCAo8uqILOUhc/486SlLqLmsYqGMx12hdnJ3QaIK3upo58qzrSQanDbFoAFobmZXYaIC2OJo+1BiIdkDrMTvmzNSAYzP/qNEBNWv4hWtmNdEDqMJvGLKTlH+x8BqZZLneFooH6AZ0weZP4QVWnAWr1eb746c6IB6QOs+OnO0DQm2s6n4G63EatLg+6owVdnvT/u/ORUPfW/wFRyfxT5BIbXAAAAABJRU5ErkJggg==" alt="user">
                            </img>
                        </Link>
                    </div>
                    <ul className='flex items-center gap-6 font-semibold'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li className='border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1' key={item.name}>
                                    <button onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus ? (
                            <li className='border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1'>
                                <button onClick={logoutHandler} disabled={loading}>
                                    {loading ? 'Logging out...' : 'Logout'}
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
