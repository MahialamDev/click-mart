'use client'
import { Menu } from 'lucide-react';
import React, { useState } from 'react';

const MobileSideNav = () => {
    const [showNav, setShowNav] = useState(false)
    return (
        <div>
            <Menu />
        </div>
    );
};

export default MobileSideNav;