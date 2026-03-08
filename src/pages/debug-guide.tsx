import { useState } from "react";
import { CheckCircle2, Circle, AlertCircle, Copy, Check, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DEBUG_STEPS = [
  {
    category: "Se houver uma mensagem de erro",
    items: [
      { id: "error-1", label: "Você leu a mensagem? (~30s)" },
      { id: "error-2", label: "Você perguntou em público? (~2m)" },
      { id: "error-3", label: "Você procurou na base de código por uma implementação? (~1m)" },
      { id: "error-4", label: "Você acessou a documentação? (~15m)" },
      { id: "error-5", label: "Você pesquisou o erro? (~15m)" },
    ]
  },
  {
    category: "As coisas pararam de funcionar \"sem motivo\"",
    items: [
      { id: "stopped-1", label: "Você salvou o arquivo? (~5s)" },
      { id: "stopped-2", label: "Você está retornando algo? (~1m)" },
      { id: "stopped-3", label: "Você está na URL correta? (~5s)" },
      { id: "stopped-4", label: "Você está conectado à VPN? (~10s)" },
      { id: "stopped-5", label: "Há alguma extensão do navegador interferindo? (~1m)" },
    ]
  },
  {
    category: "Desligue e ligue novamente",
    items: [
      { id: "restart-1", label: "Você reiniciou o servidor local? (~30s)" },
      { id: "restart-2", label: "Você reiniciou o Servidor TypeScript? (~10s)" },
      { id: "restart-3", label: "Você reinstalou os node_modules? (~1m)" },
    ]
  },
  {
    category: "Erros específicos porém comuns",
    items: [
      { id: "common-1", label: "Você limpou o cache? (~10s)" },
      { id: "common-2", label: "Você está usando a extensão de arquivo correta? (~10s)" },
      { id: "common-3", label: "Você está sincronizado com a branch correta? (~1m)" },
      { id: "common-4", label: "Seus imports estão corretos? (~30s)" },
      { id: "common-5", label: "Isso acontece em uma janela anônima? (~2m)" },
      { id: "common-6", label: "Seu usuário ativo tem o cargo correto? (~5m)" },
    ]
  },
  {
    category: "Ainda não resolvi, e agora?",
    items: [
      { id: "unresolved-1", label: "Você fez uma pausa? (~10m)" },
    ]
  }
];

export default function DebugGuidePage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalItems = DEBUG_STEPS.reduce((acc, category) => acc + category.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const allChecked = checkedCount === totalItems;

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyAndShowModal = async () => {
    const textToCopy = "o que você está tentando fazer. o que deu errado. o que você tentou até agora.";
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setShowModal(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setShowModal(true);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl  py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-metal-100 mb-4 flex items-center justify-center gap-3">
          <AlertCircle className="h-8 w-8 text-rose-accent" />
          Guia de Debugging
        </h1>
        <p className="text-metal-300 text-lg max-w-2xl mx-auto">
          Antes de pedir ajuda, passe por esta lista de verificação. Marque todos os itens para liberar o formato ideal de pedido de ajuda.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {DEBUG_STEPS.map((section, idx) => (
          <Card key={idx} className="border-metal-800 bg-metal-900/50">
            <CardHeader className="bg-metal-900 border-b border-metal-800 py-4">
              <h2 className="text-xl font-semibold text-metal-100 m-0">{section.category}</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-metal-800/50">
                {section.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-metal-800/30 ${
                        isChecked ? "bg-metal-800/20" : ""
                      }`}
                    >
                      <div className={`flex-shrink-0 transition-colors ${isChecked ? "text-emerald-accent" : "text-metal-500"}`}>
                        {isChecked ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                      </div>
                      <span className={`text-lg transition-colors ${isChecked ? "text-metal-300 line-through" : "text-metal-100"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-metal-950/90 backdrop-blur-md border-t border-metal-800 z-40 transform transition-transform">
        <div className="container mx-auto px-4 max-w-4xl  flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-metal-300 font-medium">
            Progresso: <span className={allChecked ? "text-emerald-accent" : "text-steel-blue-light"}>{checkedCount}</span> / {totalItems} itens verificados
          </div>
          <button
            onClick={handleCopyAndShowModal}
            disabled={!allChecked}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              allChecked 
                ? "bg-steel-blue hover:bg-steel-blue-light text-white shadow-lg shadow-steel-blue/20" 
                : "bg-metal-800 text-metal-500 cursor-not-allowed"
            }`}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? "Copiado!" : "Pedir Ajuda"}
          </button>
        </div>
      </div>

      {/* Attribution */}
      <div className="mt-16 text-center text-metal-400 pb-20">
        <p className="flex items-center justify-center gap-2">
          Inspirado em: 
          <a 
            href="https://como-debugar-frontend.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-steel-blue-light hover:text-cyan-accent flex items-center gap-1 transition-colors"
          >
            como-debugar-frontend.vercel.app
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-metal-900 border border-metal-700 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Check className="h-6 w-6 text-emerald-accent" />
              </div>
              <h3 className="text-2xl font-bold text-center text-metal-100 mb-4">
                Pronto para pedir ajuda!
              </h3>
              <p className="text-metal-300 mb-6 text-center">
                As seguintes perguntas foram copiadas para sua área de transferência para ajudar você a descrever seu problema:
              </p>
              
              <div className="bg-metal-950 border border-metal-800 rounded-lg p-4 mb-6">
                <p className="text-metal-200 font-mono text-sm italic">
                  "o que você está tentando fazer. o que deu errado. o que você tentou até agora."
                </p>
              </div>
              
              <p className="text-metal-300 text-center mb-8 font-medium">
                Para obter ajuda, responda-as em um parágrafo e envie para um chat em grupo (preferencialmente) ou como uma mensagem privada.
              </p>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-metal-800 hover:bg-metal-700 text-metal-100 rounded-lg font-medium transition-colors"
              >
                Entendi, fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
