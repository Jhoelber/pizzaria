import { useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

type Pizza = {
  name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
};

const whatsappNumber = "5543996619529";

const pizzas: Pizza[] = [
  {
    name: "Margherita D'Oro",
    description: "Molho de tomates, mozzarella fresca, manjericao e azeite aromatizado.",
    price: "R$ 48,00",
    tag: "Classica",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Pepperoni Nero",
    description: "Pepperoni artesanal, mozzarella, oregano e borda levemente tostada.",
    price: "R$ 56,00",
    tag: "Mais pedida",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmesao, provolone e toque de mel.",
    price: "R$ 62,00",
    tag: "Especial",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Caprese Rustica",
    description: "Tomate confit, pesto, burrata cremosa e folhas frescas.",
    price: "R$ 64,00",
    tag: "Fresca",
    image:
      "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?auto=format&fit=crop&w=900&q=80",
  },
];

function CartIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 6h2l1.3 8.2a2 2 0 0 0 2 1.8h5.9a2 2 0 0 0 1.9-1.4L20 9H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 20h.01M17 20h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type CartProps = {
  items: Array<{ pizza: Pizza; amount: number }>;
  orderUrl: string;
  onChangeAmount: (pizza: Pizza, delta: number) => void;
  onRemove: (pizza: Pizza) => void;
};

function SelectionCart({ items, orderUrl, onChangeAmount, onRemove }: CartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.amount, 0);
  const label = totalItems === 0 ? "Nenhuma pizza" : `${totalItems} pizza${totalItems === 1 ? "" : "s"}`;

  return (
    <aside className="h-fit rounded-lg border border-[#2f281d] bg-[#11100d] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)] lg:sticky lg:top-6">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d2a64f]">Carrinho</p>
      <h2 className="mt-3 font-serif text-3xl">{label}</h2>
      <div className="mt-5 space-y-4">
        {items.length > 0 ? (
          items.map(({ pizza, amount }) => (
            <div key={pizza.name} className="rounded-lg border border-[#2f281d] bg-black/20 p-3">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#f8efe0]">{pizza.name}</p>
                  <p className="mt-1 text-xs text-[#9d927f]">{pizza.price}</p>
                </div>
                <button type="button" className="text-xs font-bold text-[#d2a64f]" onClick={() => onRemove(pizza)}>
                  Excluir
                </button>
              </div>
              <div className="mt-3 grid grid-cols-[34px_minmax(0,1fr)_34px] gap-2">
                <button type="button" className="h-9 rounded-lg border border-[#5b4727] text-lg font-black text-[#d2a64f]" onClick={() => onChangeAmount(pizza, -1)}>
                  -
                </button>
                <span className="flex h-9 items-center justify-center rounded-lg bg-[#0a0907] font-black">
                  {amount}
                </span>
                <button type="button" className="h-9 rounded-lg bg-[#d2a64f] text-lg font-black text-[#0a0907]" onClick={() => onChangeAmount(pizza, 1)}>
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm leading-6 text-[#9d927f]">Escolha pizzas no menu para montar uma consulta.</p>
        )}
      </div>
      <a
        href={orderUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full justify-center rounded-lg bg-[#d2a64f] px-4 py-3 text-sm font-black text-[#0a0907]"
      >
        Pedir pelo WhatsApp
      </a>
    </aside>
  );
}

function CartDrawer({ isOpen, onClose, ...props }: CartProps & { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/65">
      <button type="button" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} aria-label="Fechar carrinho" />
      <div className="absolute bottom-0 right-0 max-h-[88vh] w-full overflow-y-auto rounded-t-lg bg-[#11100d] p-5 text-[#f8efe0] shadow-[0_-20px_46px_rgba(0,0,0,0.35)] sm:top-0 sm:h-full sm:max-h-none sm:w-[390px] sm:rounded-l-lg sm:rounded-tr-none">
        <div className="mb-4 flex items-center justify-between border-b border-[#2f281d] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d2a64f]">Carrinho</p>
          <button type="button" className="rounded-lg border border-[#5b4727] px-3 py-2 text-sm font-bold" onClick={onClose}>
            Fechar
          </button>
        </div>
        <SelectionCart {...props} />
      </div>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const selectedPizzas = useMemo(
    () =>
      pizzas
        .map((pizza) => ({ pizza, amount: selected[pizza.name] ?? 0 }))
        .filter((item) => item.amount > 0),
    [selected],
  );

  const totalItems = selectedPizzas.reduce((sum, item) => sum + item.amount, 0);

  const orderUrl = useMemo(() => {
    const lines =
      selectedPizzas.length > 0
        ? selectedPizzas.map(({ pizza, amount }) => `- ${amount}x ${pizza.name} (${pizza.price})`)
        : ["Gostaria de conhecer o cardapio de pizzas."];
    const message = [
      "Ola, vim pelo site da Pizzaria D'Oro.",
      "Tenho interesse em:",
      ...lines,
      "Pode me apresentar tamanhos, adicionais e prazo de entrega?",
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [selectedPizzas]);

  const changeAmount = (pizza: Pizza, delta: number) => {
    setSelected((current) => {
      const nextAmount = Math.max((current[pizza.name] ?? 0) + delta, 0);
      const next = { ...current };

      if (nextAmount === 0) {
        delete next[pizza.name];
      } else {
        next[pizza.name] = nextAmount;
      }

      return next;
    });
  };

  const removePizza = (pizza: Pizza) => {
    setSelected((current) => {
      const next = { ...current };
      delete next[pizza.name];
      return next;
    });
  };

  return (
    <>
      <main className="min-h-screen bg-[#0a0907] text-[#f8efe0]">
        <section className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1800&q=85"
            alt="Pizza artesanal saindo do forno"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,9,7,0.98)_0%,rgba(10,9,7,0.88)_48%,rgba(10,9,7,0.55)_100%)]" />

          <div className="relative px-5 py-6 md:px-10 lg:px-16">
            <div className="flex min-h-[500px] flex-col md:min-h-[560px] xl:min-h-[600px]">
              <header className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#d2a64f]">
                    Pizzaria D'Oro
                  </p>
                  <p className="mt-2 text-sm text-[#b9ad98]">Forno, massa lenta e ingredientes nobres</p>
                </div>
                <button type="button" className="flex items-center gap-3 text-sm font-bold text-[#d2a64f]" onClick={() => setCartOpen(true)}>
                  Carrinho
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#d2a64f] px-2 text-xs text-[#0a0907]">
                    {totalItems}
                  </span>
                </button>
              </header>

              <div className="max-w-4xl pt-24 pb-10 md:pt-28 xl:pt-32">
                <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d2a64f]">
                  Sabor artesanal
                </p>
                <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] md:text-6xl xl:text-7xl">
                  Taste the rich flavor of high quality pizza.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#c9bda8]">
                  Um conceito visual para pizzarias premium, com cardapio, selecao de itens e
                  contato direto pelo WhatsApp.
                </p>
                <a href="#menu" className="mt-8 inline-flex rounded-lg bg-[#d2a64f] px-6 py-3 text-sm font-black text-[#0a0907]">
                  Ver menu
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="px-5 py-14 md:px-10 lg:px-16">
          <div>
              <div className="mb-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d2a64f]">Today special</p>
                <h2 className="mt-3 font-serif text-4xl text-[#f8efe0]">Pizzas especiais</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {pizzas.map((pizza) => {
                  const amount = selected[pizza.name] ?? 0;

                  return (
                    <article key={pizza.name} className="overflow-hidden rounded-lg border border-[#2f281d] bg-[#15130f]">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={pizza.image} alt={pizza.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d2a64f]">{pizza.tag}</p>
                        <h3 className="mt-3 font-serif text-2xl">{pizza.name}</h3>
                        <p className="mt-3 min-h-20 text-sm leading-6 text-[#b9ad98]">{pizza.description}</p>
                        <div className="mt-5 flex items-center justify-between gap-3">
                          <span className="font-black text-[#d2a64f]">{pizza.price}</span>
                          <button
                            type="button"
                            className={`rounded-lg px-4 py-2 text-sm font-black ${
                              amount > 0 ? "border border-[#5b4727] text-[#d2a64f]" : "bg-[#d2a64f] text-[#0a0907]"
                            }`}
                            onClick={() => changeAmount(pizza, 1)}
                          >
                            {amount > 0 ? `${amount} no carrinho` : "Adicionar"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
          </div>
        </section>
      </main>

      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#d2a64f] text-[#0a0907] shadow-[0_16px_34px_rgba(0,0,0,0.35)]"
        aria-label="Abrir carrinho"
        onClick={() => setCartOpen(true)}
      >
        <CartIcon />
        {totalItems > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#8d241d] px-2 text-xs font-black text-white">
            {totalItems}
          </span>
        ) : null}
      </button>

      <CartDrawer
        isOpen={cartOpen}
        items={selectedPizzas}
        orderUrl={orderUrl}
        onClose={() => setCartOpen(false)}
        onChangeAmount={changeAmount}
        onRemove={removePizza}
      />
      <Analytics />
    </>
  );
}

export default App;
