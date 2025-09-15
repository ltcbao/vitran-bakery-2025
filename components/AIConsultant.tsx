import React, { useState, useEffect, FormEvent } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { Product, RawMenuItem } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-15h4m-2 2v-4m6 17v4m-2-2h4M19 5h4m-2-2v4m-6 4h.01M12 6h.01M12 18h.01" />
    </svg>
);

const AIConsultant: React.FC = () => {
    const [ref, isInView] = useIntersectionObserver({ threshold: 0.2 });
    const [menuItems, setMenuItems] = useState<Product[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ productName: string; reasoning: string; product: Product | null } | null>(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/menu-data.json');
                if (!response.ok) {
                    throw new Error(`Network response was not ok`);
                }
                const rawData: RawMenuItem[] = await response.json();
                const processedItems: Product[] = rawData.map(item => ({
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    imageUrls: item.imageFiles.map(file => `/images/${item.folder}/${file}`),
                }));
                setMenuItems(processedItems);
            } catch (e) {
                console.error("Failed to fetch menu items for AI consultant:", e);
                // Non-critical error, the feature will just be unavailable
            }
        };
        fetchMenuItems();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !menuItems.length) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    productName: {
                        type: Type.STRING,
                        description: 'Tên chính xác của sản phẩm được gợi ý từ danh sách thực đơn.',
                    },
                    reasoning: {
                        type: Type.STRING,
                        description: 'Một lời giải thích ngắn gọn (2-3 câu), ấm áp và đầy chất thơ về lý do tại sao sản phẩm này là lựa chọn hoàn hảo.',
                    },
                },
                required: ['productName', 'reasoning'],
            };

            const systemInstruction = "Bạn là một chuyên gia tư vấn bánh ngọt thân thiện và am hiểu tại 'Tiệm Bánh Vi Trần'. Nhiệm vụ của bạn là gợi ý một sản phẩm phù hợp nhất từ danh sách thực đơn có sẵn, dựa trên yêu cầu của khách hàng. Chỉ được phép gợi ý các sản phẩm có trong danh sách. Không được tự sáng tạo ra sản phẩm mới. Giọng văn của bạn phải thật ấm áp, mời gọi và có một chút chất thơ. Luôn trả lời bằng tiếng Việt.";

            const menuNames = menuItems.map(item => item.name).join(', ');
            const contents = `Dựa vào danh sách thực đơn sau: [${menuNames}]. Hãy gợi ý một sản phẩm cho yêu cầu này: "${userInput}"`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                    systemInstruction: systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                }
            });

            const jsonText = response.text.trim();
            const parsedResult = JSON.parse(jsonText);

            if (parsedResult.productName && parsedResult.reasoning) {
                const foundProduct = menuItems.find(item => item.name === parsedResult.productName) || null;
                setResult({ ...parsedResult, product: foundProduct });
            } else {
                throw new Error("Phản hồi từ AI không hợp lệ.");
            }

        } catch (err) {
            console.error("Error calling Gemini API:", err);
            setError("Rất tiếc, AI của chúng tôi đang bận một chút. Bạn vui lòng thử lại sau nhé!");
        } finally {
            setIsLoading(false);
        }
    };

    if (!menuItems.length) return null; // Don't render if menu isn't available

    return (
        <section id="ai-consultant" className="py-20 bg-white overflow-hidden">
            <div
                ref={ref}
                className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-brand-brown">Tư Vấn Bánh Cùng AI</h2>
                    <p className="text-lg text-gray-700 mt-2">Dịp gì, hương vị ra sao, nói cho Vi Trần biết nhé!</p>
                </div>
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ví dụ: bánh sinh nhật cho bé gái 5 tuổi, thích màu hồng và dâu tây..."
                                className="w-full h-28 p-4 pr-32 border-2 border-brand-pink rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors duration-300 resize-none"
                                aria-label="Nhập yêu cầu tư vấn bánh"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-4 -translate-y-1/2 bg-brand-accent text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed flex items-center"
                                disabled={isLoading || !userInput.trim()}
                            >
                                <SparklesIcon />
                                {isLoading ? 'Đang nghĩ...' : 'Gợi ý'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-8 min-h-[150px]">
                        {isLoading && (
                            <div className="flex justify-center items-center">
                                <div className="w-12 h-12 border-4 border-brand-pink border-t-brand-accent rounded-full animate-spin"></div>
                            </div>
                        )}
                        {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
                        {result && result.product && (
                            <div className="bg-brand-cream border border-brand-pink rounded-lg shadow-lg p-6 animate-fade-in">
                                <h3 className="text-xl font-serif font-bold text-brand-brown mb-4">Gợi ý từ Vi Trần:</h3>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <img src={result.product.imageUrls[0]} alt={result.product.name} className="w-full sm:w-40 h-40 object-cover rounded-md shadow-md" />
                                    <div>
                                        <h4 className="text-2xl font-serif font-bold text-brand-accent">{result.product.name}</h4>
                                        <p className="text-gray-700 italic mt-2">"{result.reasoning}"</p>
                                        <a href="#menu" className="inline-block mt-4 text-brand-brown font-bold hover:text-brand-accent transition-colors">
                                            Xem trong thực đơn &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default AIConsultant;
