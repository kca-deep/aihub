'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Heading,
  Text,
  Label,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,
  ImageCard,
  Carousel,
  Hero,
  Navigation,
  Footer,
  type CarouselItem
} from '@/components/ui';

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');

  // Sample images for ImageCard demo
  const sampleImages = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      alt: 'Coding workspace',
      title: 'Modern Development',
      description: 'Clean and organized workspace for productive coding sessions.',
      badge: 'Featured'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      alt: 'Design system',
      title: 'Design System',
      description: 'Comprehensive design tokens and component library.',
      badge: 'New'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      alt: 'Mobile app',
      title: 'Mobile First',
      description: 'Responsive design that works on all devices.',
      badge: 'Popular'
    }
  ];

  // Sample carousel items with images
  const carouselItems: CarouselItem[] = [
    {
      id: '1',
      content: (
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
            alt="Productivity dashboard"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end">
            <div className="p-6 text-white">
              <Heading as="h3" className="text-white mb-2">Productivity Dashboard</Heading>
              <Text className="text-white/80">Track your progress and stay organized</Text>
            </div>
          </div>
        </div>
      ),
      title: 'Productivity Dashboard',
      description: 'Track your progress and stay organized'
    },
    {
      id: '2',
      content: (
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop"
            alt="Mobile interface"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end">
            <div className="p-6 text-white">
              <Heading as="h3" className="text-white mb-2">Mobile Experience</Heading>
              <Text className="text-white/80">Optimized for all devices and screen sizes</Text>
            </div>
          </div>
        </div>
      ),
      title: 'Mobile Experience',
      description: 'Optimized for all devices and screen sizes'
    },
    {
      id: '3',
      content: (
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop"
            alt="Design system"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end">
            <div className="p-6 text-white">
              <Heading as="h3" className="text-white mb-2">Design System</Heading>
              <Text className="text-white/80">Consistent and beautiful components</Text>
            </div>
          </div>
        </div>
      ),
      title: 'Design System',
      description: 'Consistent and beautiful components'
    },
    {
      id: '4',
      content: (
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
            alt="Development workflow"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end">
            <div className="p-6 text-white">
              <Heading as="h3" className="text-white mb-2">Development Workflow</Heading>
              <Text className="text-white/80">Streamlined development process</Text>
            </div>
          </div>
        </div>
      ),
      title: 'Development Workflow',
      description: 'Streamlined development process'
    }
  ];

  // Image carousel items
  const imageCarouselItems: CarouselItem[] = [
    {
      id: '1',
      content: (
        <ImageCard
          image={{
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            alt: 'Analytics dashboard'
          }}
          title="Analytics Dashboard"
          description="Real-time data visualization"
          badge="Featured"
          hoverable
          clickable
          variant="elevated"
          size="md"
        />
      ),
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization'
    },
    {
      id: '2',
      content: (
        <ImageCard
          image={{
            src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
            alt: 'Mobile app interface'
          }}
          title="Mobile Interface"
          description="Responsive design patterns"
          badge="New"
          hoverable
          clickable
          variant="elevated"
          size="md"
        />
      ),
      title: 'Mobile Interface',
      description: 'Responsive design patterns'
    },
    {
      id: '3',
      content: (
        <ImageCard
          image={{
            src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
            alt: 'Design system components'
          }}
          title="Component Library"
          description="Reusable UI components"
          badge="Popular"
          hoverable
          clickable
          variant="elevated"
          size="md"
        />
      ),
      title: 'Component Library',
      description: 'Reusable UI components'
    },
    {
      id: '4',
      content: (
        <ImageCard
          image={{
            src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
            alt: 'Development workspace'
          }}
          title="Development Workspace"
          description="Optimized coding environment"
          badge="Trending"
          hoverable
          clickable
          variant="elevated"
          size="md"
        />
      ),
      title: 'Development Workspace',
      description: 'Optimized coding environment'
    }
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-surface-primary border-b border-border-primary">
        <div className="container-linear">
          <div className="flex items-center justify-between h-16">
                         <Heading as="h1" className="text-brand-primary">KCA AI LAB Components</Heading>
            <Text color="secondary">Component Library</Text>
          </div>
        </div>
      </header>

      <div className="container-linear py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Hero Components</Heading>
          <div className="space-y-12">
            {/* Centered Hero */}
            <div>
              <Text className="mb-3 font-medium">Centered Hero</Text>
              <Hero
                variant="centered"
                size="lg"
                title="Welcome to KCA AI LAB"
                subtitle="Modern Design System"
                description="A comprehensive component library built with KCA AI LAB Design System principles."
                badge={{
                  text: "New Release",
                  variant: "brand"
                }}
                primaryAction={{
                  label: "Get Started",
                  onClick: () => console.log('Get Started clicked')
                }}
                secondaryAction={{
                  label: "Learn More",
                  onClick: () => console.log('Learn More clicked')
                }}
                stats={[
                  { value: "50+", label: "Components" },
                  { value: "100%", label: "TypeScript" },
                  { value: "Dark", label: "Theme" },
                  { value: "KCA AI LAB", label: "Design" }
                ]}
              />
            </div>

            {/* Default Hero */}
            <div>
              <Text className="mb-3 font-medium">Default Hero</Text>
              <Hero
                variant="centered"
                size="md"
                title="Build Better Products"
                description="Create consistent, accessible, and beautiful user interfaces with our comprehensive component library."
                primaryAction={{
                  label: "Explore Components",
                  onClick: () => console.log('Explore clicked')
                }}
                secondaryAction={{
                  label: "View Documentation",
                  onClick: () => console.log('Documentation clicked')
                }}
              />
            </div>

            {/* Minimal Hero */}
            <div>
              <Text className="mb-3 font-medium">Minimal Hero</Text>
              <Hero
                variant="centered"
                size="sm"
                title="Simple & Clean"
                description="Minimal design for focused content presentation."
                primaryAction={{
                  label: "Learn More",
                  onClick: () => console.log('Learn More clicked')
                }}
              />
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Typography</Heading>
          <div className="grid gap-4">
            <div>
              <Heading as="h1">Heading 1 - Main Title</Heading>
              <Heading as="h2">Heading 2 - Section Title</Heading>
              <Heading as="h3">Heading 3 - Subsection</Heading>
              <Heading as="h4">Heading 4 - Small Title</Heading>
            </div>
            <div className="space-y-2">
              <Text size="large">Large body text for important content</Text>
              <Text size="medium">Medium body text for regular content</Text>
              <Text size="small">Small text for captions and metadata</Text>
            </div>
            <div className="space-y-2">
              <Text color="primary">Primary text color</Text>
              <Text color="secondary">Secondary text color</Text>
              <Text color="tertiary">Tertiary text color</Text>
              <Text color="muted">Muted text color</Text>
              <Text color="brand">Brand text color</Text>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Buttons</Heading>
          <div className="space-y-6">
            {/* Button Variants */}
            <div>
              <Text className="mb-3 font-medium">Variants</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <Text className="mb-3 font-medium">Sizes</Text>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="large">Large</Button>
              </div>
            </div>

            {/* Button States */}
            <div>
              <Text className="mb-3 font-medium">States</Text>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>

            {/* Button with Icons */}
            <div>
              <Text className="mb-3 font-medium">With Icons</Text>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<span>←</span>}>Back</Button>
                <Button rightIcon={<span>→</span>}>Next</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Cards</Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <Card>
              <CardHeader>
                <Heading as="h3">Default Card</Heading>
              </CardHeader>
              <CardContent>
                <Text>This is a default card with basic styling.</Text>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated" hoverable>
              <CardHeader>
                <Heading as="h3">Elevated Card</Heading>
              </CardHeader>
              <CardContent>
                <Text>This card has elevation and hover effects.</Text>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            {/* Glass Card */}
            <Card variant="glass">
              <CardHeader>
                <Heading as="h3">Glass Card</Heading>
              </CardHeader>
              <CardContent>
                <Text>This card has a glass effect with backdrop blur.</Text>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Image Cards Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Image Cards</Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                title={image.title}
                description={image.description}
                badge={image.badge}
                hoverable
                clickable
                variant="elevated"
                size="md"
              />
            ))}
          </div>
        </section>

        {/* Carousel Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Carousel</Heading>
          <div className="space-y-8">
            {/* Default Carousel with Images */}
            <div>
              <Text className="mb-3 font-medium">Default Carousel with Images</Text>
              <Carousel
                items={carouselItems}
                autoPlay
                autoPlayInterval={4000}
                className="w-full"
              />
            </div>

            {/* Image Cards Carousel */}
            <div>
              <Text className="mb-3 font-medium">Image Cards Carousel</Text>
              <Carousel
                items={imageCarouselItems}
                variant="cards"
                showArrows
                showDots
                showIndicators
                className="w-full"
              />
            </div>

            {/* Minimal Carousel */}
            <div>
              <Text className="mb-3 font-medium">Minimal Carousel</Text>
              <Carousel
                items={carouselItems.slice(0, 3)}
                variant="default"
                showArrows
                showDots
                autoPlay
                autoPlayInterval={3000}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Forms</Heading>
          <div className="space-y-8">
            {/* Input Fields */}
            <div>
              <Text className="mb-4 font-medium">Input Fields</Text>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      variant="default"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      variant="outlined"
                      error
                      fullWidth
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                      variant="filled"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      type="search"
                      placeholder="Search..."
                      variant="default"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <Text className="mb-4 font-medium">Textarea</Text>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    variant="filled"
                    autoResize
                    fullWidth
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div>
              <Text className="mb-4 font-medium">Checkboxes</Text>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Checkbox
                    id="terms"
                    label="I agree to the terms and conditions"
                    checked={checkboxValue}
                    onChange={(e) => setCheckboxValue(e.target.checked)}
                  />
                  <Checkbox
                    id="newsletter"
                    label="Subscribe to newsletter"
                    size="sm"
                  />
                  <Checkbox
                    id="marketing"
                    label="Receive marketing emails"
                    size="lg"
                  />
                </div>
                <div className="space-y-3">
                  <Checkbox
                    id="error-checkbox"
                    label="This checkbox has an error"
                    error
                  />
                  <Checkbox
                    id="disabled-checkbox"
                    label="Disabled checkbox"
                    disabled
                  />
                  <Checkbox
                    id="checked-disabled"
                    label="Checked disabled checkbox"
                    checked
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Radio Buttons */}
            <div>
              <Text className="mb-4 font-medium">Radio Buttons</Text>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Radio
                    id="option1"
                    name="options"
                    value="option1"
                    label="Option 1"
                    checked={radioValue === 'option1'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    id="option2"
                    name="options"
                    value="option2"
                    label="Option 2"
                    checked={radioValue === 'option2'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    size="sm"
                  />
                  <Radio
                    id="option3"
                    name="options"
                    value="option3"
                    label="Option 3"
                    checked={radioValue === 'option3'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    size="lg"
                  />
                </div>
                <div className="space-y-3">
                  <Radio
                    id="error-radio"
                    name="error-options"
                    value="error"
                    label="Radio with error"
                    error
                  />
                  <Radio
                    id="disabled-radio"
                    name="disabled-options"
                    value="disabled"
                    label="Disabled radio"
                    disabled
                  />
                  <Radio
                    id="checked-disabled-radio"
                    name="disabled-options"
                    value="checked-disabled"
                    label="Checked disabled radio"
                    checked
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Select */}
            <div>
              <Text className="mb-4 font-medium">Select Dropdown</Text>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    id="country"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    variant="outlined"
                    fullWidth
                  >
                    <option value="">Select a country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                    <option value="de">Germany</option>
                    <option value="fr">France</option>
                    <option value="jp">Japan</option>
                    <option value="kr">South Korea</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    variant="default"
                    fullWidth
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="development">Development</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Navigation</Heading>
          <div className="space-y-8">
            {/* Default Navigation */}
            <div>
              <Text className="mb-3 font-medium">Default Navigation</Text>
              <div className="border border-border-primary rounded-lg overflow-hidden">
                <Navigation
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Features', href: '/features' },
                    { 
                      label: 'Products', 
                      href: '/products',
                      children: [
                        { label: 'KCA AI LAB', href: '/products/kca-ai-lab' },
                        { label: 'Design System', href: '/products/design-system' },
                        { label: 'Components', href: '/products/components' }
                      ]
                    },
                    { label: 'About', href: '/about' },
                    { label: 'Contact', href: '/contact' }
                  ]}
                  actions={{
                    primary: { label: 'Get Started', onClick: () => console.log('Get Started clicked') },
                    secondary: { label: 'Sign In', onClick: () => console.log('Sign In clicked') }
                  }}
                />
              </div>
            </div>

            {/* Transparent Navigation */}
            <div>
              <Text className="mb-3 font-medium">Transparent Navigation</Text>
              <div className="border border-border-primary rounded-lg overflow-hidden bg-gradient-to-r from-brand-primary/20 to-surface-secondary/20">
                <Navigation
                  variant="transparent"
                  transparent
                  showOnScroll
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Features', href: '/features' },
                    { label: 'About', href: '/about' }
                  ]}
                  actions={{
                    primary: { label: 'Try Now', onClick: () => console.log('Try Now clicked') }
                  }}
                />
              </div>
            </div>

            {/* Minimal Navigation */}
            <div>
              <Text className="mb-3 font-medium">Minimal Navigation</Text>
              <div className="border border-border-primary rounded-lg overflow-hidden">
                <Navigation
                  size="sm"
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'About', href: '/about' },
                    { label: 'Contact', href: '/contact' }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Footer</Heading>
          <div className="space-y-8">
            {/* Default Footer */}
            <div>
              <Text className="mb-3 font-medium">Default Footer</Text>
              <Footer
                sections={[
                  {
                    title: 'Product',
                    links: [
                      { label: 'Features', href: '/features' },
                      { label: 'Pricing', href: '/pricing' },
                      { label: 'Documentation', href: '/docs' },
                      { label: 'API', href: '/api' }
                    ]
                  },
                  {
                    title: 'Company',
                    links: [
                      { label: 'About', href: '/about' },
                      { label: 'Blog', href: '/blog' },
                      { label: 'Careers', href: '/careers' },
                      { label: 'Contact', href: '/contact' }
                    ]
                  },
                  {
                    title: 'Resources',
                    links: [
                      { label: 'Help Center', href: '/help' },
                      { label: 'Community', href: '/community' },
                      { label: 'Status', href: '/status' },
                      { label: 'Security', href: '/security' }
                    ]
                  }
                ]}
                socialLinks={[
                  {
                    name: 'Twitter',
                    href: 'https://twitter.com',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'GitHub',
                    href: 'https://github.com',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )
                  }
                ]}
                newsletter={{
                  title: 'Stay Updated',
                  description: 'Get the latest updates and news.',
                  placeholder: 'Enter your email',
                  buttonText: 'Subscribe',
                  onSubmit: (email) => console.log('Newsletter subscription:', email)
                }}
              />
            </div>

            {/* Minimal Footer */}
            <div>
              <Text className="mb-3 font-medium">Minimal Footer</Text>
              <Footer
                variant="default"
                size="sm"
                sections={[
                  {
                    title: 'Product',
                    links: [
                      { label: 'Features', href: '/features' },
                      { label: 'Pricing', href: '/pricing' }
                    ]
                  },
                  {
                    title: 'Company',
                    links: [
                      { label: 'About', href: '/about' },
                      { label: 'Contact', href: '/contact' }
                    ]
                  }
                ]}
              />
            </div>

            {/* Extended Footer */}
            <div>
              <Text className="mb-3 font-medium">Extended Footer</Text>
              <Footer
                variant="extended"
                size="lg"
                sections={[
                  {
                    title: 'Product',
                    links: [
                      { label: 'Features', href: '/features' },
                      { label: 'Pricing', href: '/pricing' },
                      { label: 'Documentation', href: '/docs' },
                      { label: 'API', href: '/api' },
                      { label: 'Integrations', href: '/integrations' }
                    ]
                  },
                  {
                    title: 'Company',
                    links: [
                      { label: 'About', href: '/about' },
                      { label: 'Blog', href: '/blog' },
                      { label: 'Careers', href: '/careers' },
                      { label: 'Contact', href: '/contact' },
                      { label: 'Press', href: '/press' }
                    ]
                  },
                  {
                    title: 'Resources',
                    links: [
                      { label: 'Help Center', href: '/help' },
                      { label: 'Community', href: '/community' },
                      { label: 'Status', href: '/status' },
                      { label: 'Security', href: '/security' },
                      { label: 'Privacy', href: '/privacy' }
                    ]
                  }
                ]}
                socialLinks={[
                  {
                    name: 'Twitter',
                    href: 'https://twitter.com',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'GitHub',
                    href: 'https://github.com',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )
                  }
                ]}
                newsletter={{
                  title: 'Stay Updated',
                  description: 'Get the latest updates and news.',
                  placeholder: 'Enter your email',
                  buttonText: 'Subscribe',
                  onSubmit: (email) => console.log('Newsletter subscription:', email)
                }}
                copyright={{
                  text: '© 2024 KCA AI LAB. All rights reserved.',
                  links: [
                    { label: 'Privacy Policy', href: '/privacy' },
                    { label: 'Terms of Service', href: '/terms' }
                  ]
                }}
              />
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-12">
          <Heading as="h2" className="mb-6">Color Palette</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Brand Colors */}
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand-primary rounded-lg border border-border-primary"></div>
              <Text size="small" className="text-center">Brand Primary</Text>
            </div>

            {/* Background Colors */}
            <div className="space-y-2">
              <div className="w-full h-20 bg-background-primary rounded-lg border border-border-primary"></div>
              <Text size="small" className="text-center">Background Primary</Text>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-background-secondary rounded-lg border border-border-primary"></div>
              <Text size="small" className="text-center">Background Secondary</Text>
            </div>

            {/* Surface Colors */}
            <div className="space-y-2">
              <div className="w-full h-20 bg-surface-primary rounded-lg border border-border-primary"></div>
              <Text size="small" className="text-center">Surface Primary</Text>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-surface-secondary rounded-lg border border-border-primary"></div>
              <Text size="small" className="text-center">Surface Secondary</Text>
            </div>

            {/* Text Colors */}
            <div className="space-y-2">
              <div className="w-full h-20 bg-text-primary rounded-lg border border-border-primary"></div>
              <Text size="small" className="text-center">Text Primary</Text>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 