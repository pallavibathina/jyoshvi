import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'cm' | 'in'>('in');

  if (!isSizeGuideOpen) return null;

  const measurements = [
    { size: 'XS', us: '0 - 2', uk: '4 - 6', it: '36 - 38', bustIn: '31 - 33', bustCm: '79 - 84', waistIn: '24 - 25', waistCm: '61 - 64', hipIn: '34 - 36', hipCm: '86 - 91' },
    { size: 'S', us: '4 - 6', uk: '8 - 10', it: '40 - 42', bustIn: '33 - 35', bustCm: '84 - 89', waistIn: '26 - 27', waistCm: '66 - 69', hipIn: '36 - 38', hipCm: '91 - 97' },
    { size: 'M', us: '8 - 10', uk: '12 - 14', it: '44 - 46', bustIn: '36 - 38', bustCm: '91 - 97', waistIn: '28 - 30', waistCm: '71 - 76', hipIn: '39 - 41', hipCm: '99 - 104' },
    { size: 'L', us: '12 - 14', uk: '16 - 18', it: '48 - 50', bustIn: '39 - 41', bustCm: '99 - 104', waistIn: '31 - 33', waistCm: '79 - 84', hipIn: '42 - 44', hipCm: '107 - 112' },
    { size: 'XL', us: '16', uk: '20', it: '52', bustIn: '42 - 44', bustCm: '107 - 112', waistIn: '34 - 36', waistCm: '86 - 91', hipIn: '45 - 47', hipCm: '114 - 119' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsSizeGuideOpen(false)} 
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div 
          className="relative bg-white w-full max-w-2xl shadow-2xl border border-purple-200 overflow-hidden p-6 sm:p-8 animate-in fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-100">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-purple-900" />
              <h3 className="font-serif text-2xl text-zinc-950 font-normal">
                Atelier Sizing & Conversion
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-950"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex justify-between items-center py-4 text-xs font-semibold uppercase tracking-wider">
            <span className="text-zinc-600">Standard Body Proportions</span>
            <div className="flex border border-purple-200 bg-zinc-50 p-0.5 rounded">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded transition-colors ${
                  unit === 'in' ? 'bg-purple-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded transition-colors ${
                  unit === 'cm' ? 'bg-purple-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Table (tabular nums compliance) */}
          <div className="overflow-x-auto border border-purple-100">
            <table className="w-full text-xs text-left tabular-nums">
              <thead className="bg-[#FAF9FC] text-purple-950 uppercase tracking-wider font-semibold border-b border-purple-100">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">US</th>
                  <th className="p-3">UK</th>
                  <th className="p-3">IT</th>
                  <th className="p-3">Bust ({unit})</th>
                  <th className="p-3">Waist ({unit})</th>
                  <th className="p-3">Hips ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-purple-50/50">
                    <td className="p-3 font-bold text-purple-900">{row.size}</td>
                    <td className="p-3 text-zinc-700">{row.us}</td>
                    <td className="p-3 text-zinc-700">{row.uk}</td>
                    <td className="p-3 text-zinc-700">{row.it}</td>
                    <td className="p-3 text-zinc-800">{unit === 'in' ? row.bustIn : row.bustCm}</td>
                    <td className="p-3 text-zinc-800">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                    <td className="p-3 text-zinc-800">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure note */}
          <div className="mt-5 p-4 bg-[#FAF9FC] border border-purple-100 text-xs text-zinc-600 space-y-1">
            <div className="font-semibold text-purple-950 uppercase tracking-wider mb-1">
              Bespoke Fit Advisory:
            </div>
            <p><strong>Bust:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the floor.</p>
            <p><strong>Waist:</strong> Measure around your natural waistline, where your body creases when bending.</p>
            <p><strong>Hips:</strong> Measure around the fullest part of your hips and seat.</p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-6 py-2.5 bg-purple-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-purple-950 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
