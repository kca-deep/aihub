'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Heading, Text } from './typography';

export type FooterVariant = 'default' | 'minimal' | 'extended';
export type FooterSize = 'sm' | 'md' | 'lg';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  size?: FooterSize;
  logo?: {
    text?: string;
    image?: string;
    href?: string;
  };
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void;
  };
  copyright?: {
    text?: string;
    links?: FooterLink[];
  };
  className?: string;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    logo = { text: 'KCA AI LAB' },
    description = 'Build better products with KCA AI LAB Design System.',
    sections = [],
    socialLinks = [],
    newsletter,
    copyright = { text: '© 2024 KCA AI LAB. All rights reserved.' },
    ...props
  }, ref) => {
    const [email, setEmail] = React.useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newsletter?.onSubmit && email) {
        newsletter.onSubmit(email);
        setEmail('');
      }
    };

    const baseClasses = cn(
      'w-full bg-surface-primary border-t border-border-primary',
      {
        'py-8': size === 'sm',
        'py-12': size === 'md',
        'py-16': size === 'lg',
      },
      className
    );

    const containerClasses = cn(
      'container-linear',
      {
        'space-y-8': size === 'sm',
        'space-y-12': size === 'md',
        'space-y-16': size === 'lg',
      }
    );

    const footerTopClasses = cn(
      'grid gap-8',
      {
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': variant === 'default',
        'grid-cols-1 md:grid-cols-2': variant === 'minimal',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-5': variant === 'extended',
      }
    );

    const logoClasses = cn(
      'flex items-center space-x-2',
      {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg',
      }
    );

    const sectionTitleClasses = cn(
      'font-semibold mb-4',
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      }
    );

    const linkClasses = cn(
      'block transition-colors duration-200',
      {
        'text-sm py-1': size === 'sm',
        'text-base py-1.5': size === 'md',
        'text-lg py-2': size === 'lg',
      }
    );

    const renderFooterLink = (link: FooterLink, index: number) => (
      <Link
        key={index}
        href={link.href}
        className={cn(
          linkClasses,
          'text-text-secondary hover:text-text-primary'
        )}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
      >
        {link.label}
      </Link>
    );

    const renderSocialLink = (social: SocialLink, index: number) => (
      <Link
        key={index}
        href={social.href}
        className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
      >
        {social.icon}
      </Link>
    );

    return (
      <footer ref={ref} className={baseClasses} {...props}>
        <div className={containerClasses}>
          {/* Footer Top */}
          <div className={footerTopClasses}>
            {/* Brand Section */}
            <div className="space-y-4">
              <div className={logoClasses}>
                {logo.image ? (
                  <Image src={logo.image} alt={logo.text || 'Logo'} width={32} height={32} className="h-8 w-auto" />
                ) : (
                  <Link href={logo.href || '/'}>
                    <Heading as="h2" className="text-brand-primary font-bold">
                      {logo.text}
                    </Heading>
                  </Link>
                )}
              </div>
              <Text color="secondary" className="max-w-sm">
                {description}
              </Text>
              {socialLinks.length > 0 && (
                <div className="flex space-x-2">
                  {socialLinks.map((social, index) => renderSocialLink(social, index))}
                </div>
              )}
            </div>

            {/* Navigation Sections */}
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Heading as="h3" className={sectionTitleClasses}>
                  {section.title}
                </Heading>
                <div className="space-y-1">
                  {section.links.map((link, linkIndex) => renderFooterLink(link, linkIndex))}
                </div>
              </div>
            ))}

            {/* Newsletter Section (Extended variant only) */}
            {variant === 'extended' && newsletter && (
              <div className="lg:col-span-2">
                <Heading as="h3" className={sectionTitleClasses}>
                  {newsletter.title || 'Stay Updated'}
                </Heading>
                <Text color="secondary" className="mb-4">
                  {newsletter.description || 'Get the latest updates and news.'}
                </Text>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder={newsletter.placeholder || 'Enter your email'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
                      required
                    />
                    <Button type="submit" size="sm">
                      {newsletter.buttonText || 'Subscribe'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Newsletter Section (Default variant) */}
          {variant === 'default' && newsletter && (
            <div className="border-t border-border-primary pt-8">
              <div className="max-w-2xl mx-auto text-center">
                <Heading as="h3" className="mb-2">
                  {newsletter.title || 'Stay Updated'}
                </Heading>
                <Text color="secondary" className="mb-6">
                  {newsletter.description || 'Get the latest updates and news.'}
                </Text>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={newsletter.placeholder || 'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 bg-surface-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
                    required
                  />
                  <Button type="submit" className="w-full sm:w-auto">
                    {newsletter.buttonText || 'Subscribe'}
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Footer Bottom */}
          <div className="border-t border-border-primary pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <Text color="secondary" size="small">
                {copyright.text}
              </Text>
              {copyright.links && copyright.links.length > 0 && (
                <div className="flex space-x-6">
                  {copyright.links.map((link, index) => renderFooterLink(link, index))}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer'; 