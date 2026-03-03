"use client"

import LandingPageLayout from "@/components/layouts/LandingPageLayout"
import Cart from "@/components/views/Cart"

const PageCart = () => {
    return (
        <LandingPageLayout title="My Cart">
            <Cart />
        </LandingPageLayout>
    )
}

export default PageCart