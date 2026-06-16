'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from './supabaseClient';

export default function AdminPortal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) {
      alert('Please fill all required fields!');
      return;
    }

    setUploading(true);
    let publicUrl = '';

    try {
      // 1. Agar user ne image select ki hai, toh pehle use Supabase Storage mein upload karein
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}_${Date.now()}.${fileExt}`;
        const filePath = `artifacts/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('heritage-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Image ka Public link generate karein
        const { data } = supabase.storage.from('heritage-images').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      // 2. Database table mein data insert karein (imageUrl aur approved: false ke sath)
      const { error: insertError } = await supabase
        .from('Artifact')
        .insert([
          { 
            title, 
            description, 
            location, 
            imageUrl: publicUrl,
            approved: false // By default false taake admin dashboard se approve kare
          }
        ]);

      if (insertError) throw insertError;

      alert('Zabardast! Artifact successfully submitted for admin approval! 🎉');
      
      // Form fields ko clear karein
      setTitle('');
      setDescription('');
      setLocation('');
      setImageFile(null);

      // File input element ko visually reset karne ke liye form reload ki zaroorat nahi
      const fileInput = document.getElementById('image-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      console.error('Error details:', error);
      alert('Error saving data: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ background: '#F5F2EB', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* 🗺️ INTEGRATED AJRAK BLUE NAVBAR */}
      <nav style={{ 
        background: "#1A2A6C", 
        padding: "15px 30px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{ color: "#F5F2EB", fontWeight: "bold", fontSize: "18px" }}>
          Sindh Heritage Vault 🏛️
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/" style={{ color: "#F5F2EB", textDecoration: "none", fontWeight: "500", fontSize: "15px" }}>
            📝 Add Artifact (Public)
          </Link>
          <Link href="/archive" style={{ color: "#F5F2EB", textDecoration: "none", fontWeight: "500", fontSize: "15px" }}>
            🖼️ Public Archive
          </Link>
        </div>
      </nav>

      {/* Main Form Container */}
      <div style={{ padding: '50px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: '6px solid #1A2A6C' }}>
          
          <h2 style={{ color: '#1A2A6C', marginTop: 0, marginBottom: '10px', textAlign: 'center' }}>
            Share Minority Heritage Asset
          </h2>
          <p style={{ color: '#777', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
            Submit a cultural story, artifact detail, or historical site. Submissions are live after admin verification.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#1A2A6C' }}>Artifact Title / Site Name</label>
              <input 
                type="text" 
                placeholder="e.g., Sadhu Bela Temple, Sukkur" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#1A2A6C' }}>Description / History / Story</label>
              <textarea 
                rows={5} 
                placeholder="Share the cultural significance, history, or community narrative of this asset..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#1A2A6C' }}>Geographical Location</label>
              <input 
                type="text" 
                placeholder="e.g., Sukkur, Sindh" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            {/* 📸 IMAGE UPLOAD FIELD */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#1A2A6C' }}>
                Upload Heritage Image 📸
              </label>
              <input 
                id="image-input"
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  border: '1px solid #ccc', 
                  background: '#fafafa',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* SUBMIT BUTTON WITH LOADER STATE */}
            <button 
              type="submit" 
              disabled={uploading}
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: uploading ? '#A38A73' : '#1A2A6C', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: 'bold', 
                fontSize: '16px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 10px rgba(26,42,108,0.2)',
                transition: 'background 0.2s ease'
              }}
            >
              {uploading ? 'Processing & Uploading Image...' : 'Submit to Digital Vault'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}