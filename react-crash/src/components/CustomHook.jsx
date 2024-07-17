import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const CustomHook = (refTab = null) => {
  const thisTab = refTab;
  const activeTab = useSelector(state => state.activeTab);
  useEffect(() => {
    if (thisTab.current && thisTab.current.classList.contains(activeTab.toLowerCase())) {
        thisTab.current.style.display = 'grid';
    } else {
        thisTab.current.style.display = 'none';}
  }, [activeTab])
}

export default CustomHook