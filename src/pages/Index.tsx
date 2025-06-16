
import { useState, useEffect, useRef } from 'react';
import { Ship, Dices, Download, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateShip, SpriteMatrix } from '@/lib/shipGenerator';
import { generateCar } from '@/lib/carGenerator';
import SpriteCanvas from '@/components/SpriteCanvas';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [spriteMatrix, setSpriteMatrix] = useState<SpriteMatrix | null>(null);
  const [activeTab, setActiveTab] = useState('spaceships');
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    let newSprite;
    if (activeTab === 'spaceships') {
      newSprite = generateShip();
      toast.success('New debris fragment classified!');
    } else if (activeTab === 'cars') {
      newSprite = generateCar();
      toast.success('New vehicle blueprint generated!');
    }
    setSpriteMatrix(newSprite);
  };

  const handleDownload = () => {
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${activeTab}_sprite_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.info('Sprite downloaded.');
    } else {
      toast.error('Could not find canvas to download.');
    }
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <header className="w-full max-w-2xl text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Ship className="w-10 h-10 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Debris</h1>
          </div>
          <p className="text-lg text-muted-foreground">Random Sprite Generator</p>
        </header>
        
        <main className="w-full max-w-md flex flex-col items-center gap-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="spaceships">
                <Ship className="mr-2 h-5 w-5" />
                Spaceships
              </TabsTrigger>
              <TabsTrigger value="cars">
                <Car className="mr-2 h-5 w-5" />
                Cars
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div 
            ref={canvasContainerRef} 
            className="w-full aspect-square border-2 border-dashed border-border rounded-xl p-4 bg-card/50 flex items-center justify-center"
          >
            {spriteMatrix && <SpriteCanvas spriteMatrix={spriteMatrix} />}
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <Button onClick={handleGenerate} size="lg" variant="secondary">
              <Dices className="mr-2 h-5 w-5" />
              Generate
            </Button>
            <Button onClick={handleDownload} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download
            </Button>
          </div>
        </main>
      </div>
      <footer className="w-full text-center py-4">
        <p className="text-sm text-muted-foreground">
          Made with love by{' '}
          <a
            href="https://hritwik.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Hritwik
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
