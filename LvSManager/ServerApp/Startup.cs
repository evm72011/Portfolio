using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.FileProviders;
using System.IO;
using ServerApp.Models;

using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

namespace ServerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.IgnoreNullValues = true;
            });
            services.AddAntiforgery( opts =>
             {
                 opts.HeaderName = "X-XSRF-TOKEN";
             } );
            ApplicationSettings.LoadSettings(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            // For deployment
            if( !ApplicationSettings.DevelopmetMode )
            {
                app.UseStaticFiles( new StaticFileOptions
                {
                    RequestPath = "",
                    FileProvider = new PhysicalFileProvider( Path.Combine( Directory.GetCurrentDirectory(), "./wwwroot/app" ) )
                } );
            }

            app.UseRouting();

            app.UseAuthorization();

            app.Use( next => context =>
             {
                 string path = context.Request.Path.Value;
                 if( string.Equals( path, "/", StringComparison.OrdinalIgnoreCase ) )
                 {
                     var tokens = antiforgery.GetAndStoreTokens( context );
                     context.Response.Cookies.Append( "XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false } );
                 }
                 return next( context );
             } );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            //For development
            if( ApplicationSettings.DevelopmetMode )
            {
                app.UseSpa( spa =>
                 {
                     string strategy = Configuration.GetValue<string>( "DevTools:ConnectionStrategy" );
                     if( strategy == "proxy" )
                     {
                         spa.UseProxyToSpaDevelopmentServer( "http://127.0.0.1:4200" );
                     }
                     else if( strategy == "managed" )
                     {
                         spa.Options.SourcePath = "../ClientApp";
                         spa.UseAngularCliServer( "start" );
                     }
                 } );
            }
        }
    }
}
