import { ReactNode } from "react";



interface IProps {
    children: ReactNode
}

const CommonLayout = ({ children }: IProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            This is a react app
            <div className="grow">

                {children}
            </div>
        </div>
    );
};

export default CommonLayout;