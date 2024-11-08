import React from 'react';
import { useRouter } from 'next/router';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

function SocialShare() {
  const router = useRouter();
  const url = typeof window !== 'undefined' ? window.location.origin + router.asPath : '';
  const defaultUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const text = 'Regardez cette recette !';

  const shareFacebook = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = router.pathname.includes('recette') ? url : defaultUrl;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  const shareTwitter = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = router.pathname.includes('recette') ? url : defaultUrl;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      <button onClick={shareFacebook}><FaFacebook /></button>
      <span>  </span>
      <button onClick={shareTwitter}><FaTwitter /></button>
    </div>
  );
}

export default SocialShare;
