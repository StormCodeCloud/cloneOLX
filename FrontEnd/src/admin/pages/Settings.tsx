import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar.tsx';
import AdminHeader from '../components/AdminHeader.tsx';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'ClassiPlace',
    siteDescription: 'A sua plataforma de classificados online',
    contactEmail: 'suporte@classiplace.pt',
    maxImagesPerAd: 10,
    requireEmailVerification: true,
    autoApproveAds: false,
    maintenanceMode: false,
    allowUserRegistration: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvamento
    alert('Definições guardadas com sucesso!');
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Definições do Sistema" />
        
        <main className="p-4">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Definições Gerais</h5>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nome do Site</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settings.siteName}
                        onChange={e => setSettings({...settings, siteName: e.target.value})}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Descrição do Site</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={settings.siteDescription}
                        onChange={e => setSettings({...settings, siteDescription: e.target.value})}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email de Contacto</label>
                      <input
                        type="email"
                        className="form-control"
                        value={settings.contactEmail}
                        onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Máximo de Imagens por Anúncio</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.maxImagesPerAd}
                        onChange={e => setSettings({...settings, maxImagesPerAd: parseInt(e.target.value)})}
                      />
                    </div>

                    <hr className="my-4" />

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.requireEmailVerification}
                          onChange={e => setSettings({...settings, requireEmailVerification: e.target.checked})}
                        />
                        <label className="form-check-label">
                          Exigir Verificação de Email
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.autoApproveAds}
                          onChange={e => setSettings({...settings, autoApproveAds: e.target.checked})}
                        />
                        <label className="form-check-label">
                          Aprovar Anúncios Automaticamente
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.allowUserRegistration}
                          onChange={e => setSettings({...settings, allowUserRegistration: e.target.checked})}
                        />
                        <label className="form-check-label">
                          Permitir Registo de Utilizadores
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})}
                        />
                        <label className="form-check-label">
                          Modo de Manutenção
                        </label>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <button type="reset" className="btn btn-outline-secondary">
                        Restaurar Padrões
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Guardar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">Backup do Sistema</h5>
                  <p className="text-muted small">
                    Faça um backup completo dos dados do sistema.
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    Gerar Backup
                  </button>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">Limpar Cache</h5>
                  <p className="text-muted small">
                    Limpe o cache do sistema para resolver problemas de desempenho.
                  </p>
                  <button className="btn btn-outline-danger w-100">
                    Limpar Cache
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings; 