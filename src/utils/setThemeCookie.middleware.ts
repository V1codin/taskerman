import { NextRequest, NextResponse } from 'next/server';

export const setThemeCookie = (
  req: NextRequest,
  response: NextResponse,
): NextResponse => {
  const currentThemeCookie = req.cookies.get('theme')?.value;

  response.cookies.set({
    name: 'theme',
    value: currentThemeCookie || 'dark',
  });

  return response;
};
