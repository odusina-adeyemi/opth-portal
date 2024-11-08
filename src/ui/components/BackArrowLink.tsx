import React from 'react';
import { Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

interface BackArrowLinkProps {
  color: string;
  href: string;
  title: string;
}

const BackArrowLink = ({ color, href, title }: BackArrowLinkProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Link
        href={href}
        style={{ color, display: 'flex', alignItems: 'center' }}>
        <ArrowBack sx={{ m: 1 }} />
        {title}
      </Link>
    </Box>
  );
};

export default BackArrowLink;
