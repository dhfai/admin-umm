
const AuthLayout = ({children} :{children: React.ReactNode}) => {
  return (
    <div className="">
        {/* <div className="flex flex-col items-center justify-between px-6 py-8 mc-auto h-screen"> */}
            {/* <div className="w-full bg-white rounded-lg shadow-lg mt-0 max-w-md"> */}
                {children}
            {/* </div> */}
        {/* </div> */}
    </div>
  )
}

export default AuthLayout
