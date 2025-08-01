'use client';

import React from 'react';
import { 
  Heading, 
  Text, 
  Button, 
  Card, 
  CardContent, 
  CardHeader,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  ImageCard,
  Hero,
  Navigation,
  Footer,
  Logo
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function GalleryPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Navigation */}
      <Navigation
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Components', href: '#components' },
          { label: 'About', href: '#about' }
        ]}
        actions={{
          primary: { 
            label: '컴포넌트 보기', 
            onClick: () => scrollToSection('components') 
          },
          secondary: { 
            label: '홈으로', 
            onClick: () => window.location.href = '/' 
          }
        }}
        variant="transparent"
        sticky
        logo={<Logo variant="white" size="md" />}
      />

      {/* Hero Section */}
      <Hero
        variant="centered"
        size="lg"
        title="Linear Design System Gallery"
        subtitle="모든 컴포넌트를 한눈에"
        description="Linear Design System의 모든 컴포넌트들을 실제 사용 예시와 함께 확인해보세요."
        primaryAction={{ 
          label: "컴포넌트 탐색", 
          onClick: () => scrollToSection('components') 
        }}
        secondaryAction={{ 
          label: "홈으로 돌아가기", 
          onClick: () => window.location.href = '/' 
        }}
        badge={{ text: "Design System", variant: "brand" }}
        className="section-padding"
      />

      {/* Components Gallery */}
      <section id="components" className="section-padding bg-background-secondary">
        <div className="container-linear">
          <div className="text-center mb-16">
            <Heading as="h2" className="text-h2 mb-4">
              Component Gallery
            </Heading>
            <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
              Linear Design System의 모든 컴포넌트들을 확인해보세요
            </Text>
          </div>

          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="tabs">Tabs</TabsTrigger>
            </TabsList>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="space-y-8">
              <div>
                <Heading as="h3" className="mb-4">Button Variants</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <Heading as="h4">Primary Button</Heading>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="primary">Primary Button</Button>
                      <Button variant="primary" size="sm">Small</Button>
                      <Button variant="primary" size="large">Large</Button>
                      <Button variant="primary" loading>Loading</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading as="h4">Secondary Button</Heading>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="secondary" size="sm">Small</Button>
                      <Button variant="secondary" size="large">Large</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading as="h4">Ghost Button</Heading>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="ghost">Ghost Button</Button>
                      <Button variant="ghost" size="sm">Small</Button>
                      <Button variant="ghost" size="large">Large</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards" className="space-y-8">
              <div>
                <Heading as="h3" className="mb-4">Card Variants</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <Heading as="h4">Default Card</Heading>
                    </CardHeader>
                    <CardContent>
                      <Text>This is a default card with some content.</Text>
                    </CardContent>
                  </Card>

                  <Card variant="elevated">
                    <CardHeader>
                      <Heading as="h4">Elevated Card</Heading>
                    </CardHeader>
                    <CardContent>
                      <Text>This is an elevated card with shadow.</Text>
                    </CardContent>
                  </Card>

                  <Card hoverable clickable>
                    <CardHeader>
                      <Heading as="h4">Interactive Card</Heading>
                    </CardHeader>
                    <CardContent>
                      <Text>This card is hoverable and clickable.</Text>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Heading as="h3" className="mb-4">Image Cards</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ImageCard
                    image={{ src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", alt: "AI Project" }}
                    title="AI Project"
                    description="An amazing AI project"
                    badge="New"
                    hoverable
                    clickable
                  />
                  <ImageCard
                    image={{ src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", alt: "ML Model" }}
                    title="ML Model"
                    description="Machine learning model"
                    hoverable
                  />
                </div>
              </div>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-8">
              <div>
                <Heading as="h3" className="mb-4">Form Components</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <Heading as="h4">Input Fields</Heading>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input variant="outlined" placeholder="Outlined input" />
                      <Input variant="filled" placeholder="Filled input" />
                      <Textarea variant="outlined" placeholder="Textarea" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading as="h4">Form Controls</Heading>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Checkbox label="Accept terms and conditions" />
                      <Radio name="options" label="Option 1" value="option1" />
                      <Radio name="options" label="Option 2" value="option2" />
                      <Select>
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </Select>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-8">
              <div>
                <Heading as="h3" className="mb-4">Alert Variants</Heading>
                <div className="space-y-4">
                  <Alert>
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>
                      This is a default alert with some important information.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="brand">
                    <AlertTitle>Brand Alert</AlertTitle>
                    <AlertDescription>
                      This is a brand alert with primary color styling.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success">
                    <AlertTitle>Success Alert</AlertTitle>
                    <AlertDescription>
                      This is a success alert for positive feedback.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="warning">
                    <AlertTitle>Warning Alert</AlertTitle>
                    <AlertDescription>
                      This is a warning alert for important notices.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="error">
                    <AlertTitle>Error Alert</AlertTitle>
                    <AlertDescription>
                      This is an error alert for critical issues.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges" className="space-y-8">
              <div>
                <Heading as="h3" className="mb-4">Badge Variants</Heading>
                <div className="space-y-6">
                  <div>
                    <Heading as="h4" className="mb-4">Badge Variants</Heading>
                    <div className="flex flex-wrap gap-4">
                      <Badge variant="default">Default</Badge>
                      <Badge variant="brand">Brand</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>

                  <div>
                    <Heading as="h4" className="mb-4">Badge Sizes</Heading>
                    <div className="flex flex-wrap gap-4">
                      <Badge size="sm">Small</Badge>
                      <Badge size="md">Medium</Badge>
                      <Badge size="lg">Large</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tabs Tab */}
            <TabsContent value="tabs" className="space-y-8">
              <div>
                <Heading as="h3" className="mb-4">Tabs Component</Heading>
                <Card>
                  <CardContent className="p-6">
                    <Tabs defaultValue="tab1" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab1" className="mt-4">
                        <Text>This is the content for tab 1.</Text>
                      </TabsContent>
                      <TabsContent value="tab2" className="mt-4">
                        <Text>This is the content for tab 2.</Text>
                      </TabsContent>
                      <TabsContent value="tab3" className="mt-4">
                        <Text>This is the content for tab 3.</Text>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <Footer
        sections={[
          {
            title: 'Linear Design System',
            links: [
              { label: 'Components', href: '#components' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'Documentation', href: '#' },
              { label: 'GitHub', href: '#' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { label: 'Design Tokens', href: '#' },
              { label: 'Color Palette', href: '#' },
              { label: 'Typography', href: '#' },
              { label: 'Spacing', href: '#' }
            ]
          }
        ]}
        socialLinks={[
          {
            name: 'GitHub',
            href: '#',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )
          }
        ]}
        newsletter={{
          title: 'Design System Updates',
          description: 'Get notified about new components and updates.',
          onSubmit: (email) => console.log('Newsletter subscription:', email)
        }}
        variant="extended"
      />
    </div>
  );
} 